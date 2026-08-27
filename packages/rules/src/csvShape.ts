import { isValidIsoDate } from "./dates.js";
import { parseMoneyToCents } from "./money.js";
import { finding } from "./reasons.js";
import type { RuleFinding } from "./types.js";

// Shape validation for the NDIA bulk payment request CSV, the exact artefact
// the agency receives. Column names follow the NDIA bulk upload template
// (docs/research/claims-process.md); rules encoded here are the ones that
// reject a file at upload time. Semantic validation (plans, budgets, prices)
// is the engine's job, not this module's.

export const BULK_CSV_COLUMNS = [
	"RegistrationNumber",
	"NDISNumber",
	"SupportsDeliveredFrom",
	"SupportsDeliveredTo",
	"SupportNumber",
	"ClaimReference",
	"Quantity",
	"Hours",
	"UnitPrice",
	"GSTCode",
	"AuthorisedBy",
	"ParticipantApproved",
	"InKindFundingProgram",
	"ClaimType",
	"CancellationReason",
	"ABN of Support Provider",
] as const;

// Columns that must be non-empty on every row for the upload to process.
const REQUIRED_COLUMNS = [
	"RegistrationNumber",
	"NDISNumber",
	"SupportsDeliveredFrom",
	"SupportsDeliveredTo",
	"SupportNumber",
	"ClaimReference",
	"UnitPrice",
	"GSTCode",
] as const;

const PLAIN_NUMBER_RE = /^\d{1,7}(\.\d{1,4})?$/;

export type BulkCsvRow = Partial<
	Record<(typeof BULK_CSV_COLUMNS)[number], string>
>;

// The portal rejects bulk files whose name exceeds 20 characters including
// the ".CSV" extension.
export function validateBulkFilename(filename: string): RuleFinding[] {
	const findings: RuleFinding[] = [];
	if (!filename.toUpperCase().endsWith(".CSV")) {
		findings.push(finding("FILENAME_NOT_CSV"));
	}
	if (filename.length > 20) {
		findings.push(finding("FILENAME_TOO_LONG"));
	}
	return findings;
}

export function validateBulkCsvRow(row: BulkCsvRow): RuleFinding[] {
	const findings: RuleFinding[] = [];

	for (const column of REQUIRED_COLUMNS) {
		const value = row[column] ?? "";
		if (value === "") {
			findings.push(finding("MISSING_REQUIRED_FIELD"));
			break;
		}
	}

	const from = row.SupportsDeliveredFrom ?? "";
	const to = row.SupportsDeliveredTo ?? "";
	if (
		(from !== "" && !isValidIsoDate(from)) ||
		(to !== "" && !isValidIsoDate(to))
	) {
		findings.push(finding("INVALID_DATE_FORMAT"));
	}

	const unitPrice = row.UnitPrice ?? "";
	if (unitPrice !== "" && parseMoneyToCents(unitPrice) === null) {
		findings.push(finding("INVALID_MONEY_FORMAT"));
	}

	const quantity = row.Quantity ?? "";
	const hours = row.Hours ?? "";
	if (quantity !== "" && hours !== "") {
		findings.push(finding("QUANTITY_AND_HOURS_BOTH_SET"));
	} else if (quantity === "" && hours === "") {
		findings.push(finding("QUANTITY_AND_HOURS_BOTH_EMPTY"));
	} else {
		const value = quantity !== "" ? quantity : hours;
		if (!PLAIN_NUMBER_RE.test(value) || Number(value) <= 0) {
			findings.push(finding("INVALID_NUMBER_FORMAT"));
		}
	}

	return findings;
}
