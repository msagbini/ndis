import type { ReasonCode } from "./reasons.js";

export type Verdict = "PASS" | "FAIL" | "NEEDS_REVIEW";

// Geographic pricing class. Derived from the Modified Monash Model (MMM):
// MMM 1-5 -> national, MMM 6 -> remote, MMM 7 -> veryRemote. The mapping from
// an address to a class happens upstream; the engine only consumes the class.
export type LocationClass = "national" | "remote" | "veryRemote";

// One fundable support in one catalogue version. All prices are integer cents.
export interface SupportItem {
	supportItemNumber: string;
	supportItemName: string;
	// Budget category the item draws from ("support category" in NDIS terms).
	supportCategoryNumber: string;
	// Unit of claim, e.g. "H" (hour) or "EA" (each), as published per item.
	unit: string;
	// Items flagged quote-required in the catalogue cannot be auto-passed:
	// the agreed quote, not the price limit, caps them.
	quoteRequired: boolean;
	priceLimitCents: Record<LocationClass, number>;
}

// One dated version of the price catalogue. Prices change every 1 July plus
// mid-year amendments, so validity is a date range, never "current".
export interface CatalogueVersion {
	versionId: string;
	// Provenance of the data, e.g. the FIXTURE file name or the official
	// document title + download date. Never empty.
	source: string;
	effectiveFrom: string; // ISO date, inclusive
	effectiveTo: string; // ISO date, inclusive
	items: SupportItem[];
}

export interface BudgetCategory {
	supportCategoryNumber: string;
	allocatedCents: number;
	// Spend already committed before this batch (paid + submitted claims).
	spentCents: number;
}

export interface Plan {
	planId: string;
	ndisNumber: string;
	startDate: string; // ISO date, inclusive
	endDate: string; // ISO date, inclusive
	budgets: BudgetCategory[];
}

// One claim line, mirroring the NDIA bulk payment request columns.
// Raw CSV parsing/validation lives in csvShape.ts; by the time a ClaimLine
// reaches the engine its numeric fields are already numbers.
export interface ClaimLine {
	claimReference: string;
	registrationNumber: string;
	ndisNumber: string;
	supportsDeliveredFrom: string;
	supportsDeliveredTo: string;
	supportNumber: string;
	quantity: number; // units or hours; up to 4 decimal places
	unitPriceCents: number;
	// "" = standard service delivery; otherwise an uppercase code (CANC, ...).
	claimType: string;
	// Required (non-empty) only when claimType is CANC.
	cancellationReason: string;
	locationClass: LocationClass;
}

export interface RuleFinding {
	code: ReasonCode;
	severity: "fail" | "review";
	message: string;
}

export interface LineResult {
	claimReference: string;
	verdict: Verdict;
	findings: RuleFinding[];
	// Total the line would draw from the budget; null when it cannot be
	// computed (invalid quantity/price) or the line failed earlier checks.
	lineTotalCents: number | null;
}

// Valid code sets are data, not constants baked into logic: the official
// lists load from NDIA documents (or FIXTURE_ files until those arrive).
export interface EngineConfig {
	// Valid non-standard claim types, uppercase (e.g. CANC, TRAN, NF2F).
	claimTypes: string[];
	// Valid cancellation reason codes, uppercase.
	cancellationReasons: string[];
}

export interface ValidationContext {
	plan: Plan;
	catalogue: CatalogueVersion[];
	// "Today" injected by the caller so results are reproducible.
	validationDate: string;
	config: EngineConfig;
	// Duplicate keys of claims already submitted historically (see
	// duplicateKey in engine.ts); batch-internal duplicates are always checked.
	priorClaimKeys?: string[];
}
