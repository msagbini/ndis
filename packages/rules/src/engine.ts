import { findCatalogueVersion, findSupportItem } from "./catalogue.js";
import { isOnOrBefore, isValidIsoDate } from "./dates.js";
import { isValidQuantity, lineTotalCents } from "./money.js";
import { finding } from "./reasons.js";
import type {
	ClaimLine,
	LineResult,
	RuleFinding,
	SupportItem,
	ValidationContext,
	Verdict,
} from "./types.js";

// Key identifying "the same service claimed twice". Fields chosen from the
// bulk-upload columns that identify a delivery; ClaimReference is excluded
// on purpose — resubmitting under a new reference is exactly the duplicate
// this must catch.
export function duplicateKey(line: ClaimLine): string {
	return [
		line.ndisNumber,
		line.supportNumber,
		line.supportsDeliveredFrom,
		line.supportsDeliveredTo,
		line.registrationNumber,
	].join("|");
}

interface LineAnalysis {
	findings: RuleFinding[];
	item: SupportItem | null;
	totalCents: number | null;
}

function analyseLine(line: ClaimLine, ctx: ValidationContext): LineAnalysis {
	const findings: RuleFinding[] = [];

	// Amounts
	const quantityOk = isValidQuantity(line.quantity);
	if (!quantityOk) {
		findings.push(finding("INVALID_QUANTITY"));
	}
	const priceOk =
		Number.isInteger(line.unitPriceCents) && line.unitPriceCents > 0;
	if (!priceOk) {
		findings.push(finding("INVALID_UNIT_PRICE"));
	}
	const totalCents =
		quantityOk && priceOk
			? lineTotalCents(line.quantity, line.unitPriceCents)
			: null;

	// Claim type codes. Blank claim type = standard service delivery.
	if (
		line.claimType !== "" &&
		!ctx.config.claimTypes.includes(line.claimType)
	) {
		findings.push(finding("INVALID_CLAIM_TYPE"));
	}
	if (line.claimType === "CANC") {
		if (line.cancellationReason === "") {
			findings.push(finding("CANCELLATION_REASON_MISSING"));
		} else if (
			!ctx.config.cancellationReasons.includes(line.cancellationReason)
		) {
			findings.push(finding("INVALID_CANCELLATION_REASON"));
		}
	} else if (line.cancellationReason !== "") {
		findings.push(finding("CANCELLATION_REASON_UNEXPECTED"));
	}

	// Participant on the claim must be the participant on the plan.
	if (line.ndisNumber !== ctx.plan.ndisNumber) {
		findings.push(finding("PLAN_PARTICIPANT_MISMATCH"));
	}

	// Dates. Later checks need valid dates, so a format failure stops here.
	const fromOk = isValidIsoDate(line.supportsDeliveredFrom);
	const toOk = isValidIsoDate(line.supportsDeliveredTo);
	if (!fromOk || !toOk) {
		findings.push(finding("INVALID_DATE_FORMAT"));
		return { findings, item: null, totalCents };
	}
	if (!isOnOrBefore(line.supportsDeliveredFrom, line.supportsDeliveredTo)) {
		findings.push(finding("DATE_RANGE_INVERTED"));
		return { findings, item: null, totalCents };
	}
	if (!isOnOrBefore(line.supportsDeliveredTo, ctx.validationDate)) {
		findings.push(finding("SERVICE_DATE_IN_FUTURE"));
	}
	if (
		!isOnOrBefore(ctx.plan.startDate, line.supportsDeliveredFrom) ||
		!isOnOrBefore(line.supportsDeliveredTo, ctx.plan.endDate)
	) {
		findings.push(finding("OUTSIDE_PLAN_DATES"));
	}

	// Catalogue and price limit, against the version effective on the day
	// delivery started.
	const version = findCatalogueVersion(
		ctx.catalogue,
		line.supportsDeliveredFrom,
	);
	if (version === null) {
		findings.push(finding("NO_CATALOGUE_FOR_DATE"));
		return { findings, item: null, totalCents };
	}
	const item = findSupportItem(version, line.supportNumber);
	if (item === null) {
		findings.push(finding("ITEM_NOT_IN_CATALOGUE"));
		return { findings, item: null, totalCents };
	}
	if (line.unitPriceCents > item.priceLimitCents[line.locationClass]) {
		findings.push(finding("PRICE_ABOVE_LIMIT"));
	}
	if (item.quoteRequired) {
		findings.push(finding("QUOTE_REQUIRED"));
	}

	return { findings, item, totalCents };
}

function verdictOf(findings: RuleFinding[]): Verdict {
	let verdict: Verdict = "PASS";
	for (const f of findings) {
		if (f.severity === "fail") {
			return "FAIL";
		}
		verdict = "NEEDS_REVIEW";
	}
	return verdict;
}

// Validates a batch in submission order. Batch-level effects:
// - duplicate detection inside the batch and against prior claim history;
// - budget consumption is sequential, so an early line can exhaust the
//   budget an otherwise-valid later line needed.
// Lines that FAIL do not consume budget.
export function validateClaims(
	lines: ClaimLine[],
	ctx: ValidationContext,
): LineResult[] {
	const analyses = lines.map((line) => analyseLine(line, ctx));

	// Duplicates
	const priorKeys = new Set(ctx.priorClaimKeys ?? []);
	const seenInBatch = new Set<string>();
	lines.forEach((line, i) => {
		const key = duplicateKey(line);
		const analysis = analyses[i] as LineAnalysis;
		if (priorKeys.has(key)) {
			analysis.findings.push(finding("DUPLICATE_OF_HISTORY"));
		}
		if (seenInBatch.has(key)) {
			analysis.findings.push(finding("DUPLICATE_IN_BATCH"));
		}
		seenInBatch.add(key);
	});

	// Budget, in order, only for lines still clean enough to be paid.
	const consumedCents = new Map<string, number>();
	for (const analysis of analyses) {
		if (analysis.findings.some((f) => f.severity === "fail")) {
			continue;
		}
		// Invariant: a line with no fail findings always resolved its item and
		// total — every path in analyseLine that cannot resolve them records a
		// fail finding first.
		const item = analysis.item as SupportItem;
		const totalCents = analysis.totalCents as number;
		const category = item.supportCategoryNumber;
		const budget = ctx.plan.budgets.find(
			(b) => b.supportCategoryNumber === category,
		);
		if (budget === undefined) {
			analysis.findings.push(finding("BUDGET_CATEGORY_MISSING"));
			continue;
		}
		const alreadyConsumed = consumedCents.get(category) ?? 0;
		const remaining =
			budget.allocatedCents - budget.spentCents - alreadyConsumed;
		if (totalCents > remaining) {
			analysis.findings.push(finding("BUDGET_EXCEEDED"));
			continue;
		}
		consumedCents.set(category, alreadyConsumed + totalCents);
	}

	return lines.map((line, i) => {
		const analysis = analyses[i] as LineAnalysis;
		return {
			claimReference: line.claimReference,
			verdict: verdictOf(analysis.findings),
			findings: analysis.findings,
			lineTotalCents: analysis.totalCents,
		};
	});
}

export function validateClaim(
	line: ClaimLine,
	ctx: ValidationContext,
): LineResult {
	return (validateClaims([line], ctx) as [LineResult])[0];
}
