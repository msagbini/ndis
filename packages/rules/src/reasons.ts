// Machine-readable reason codes with fixed plain-English messages.
// These are OUR codes. Once the founder supplies the NDIA's official
// "Bulk Payment request self-help guide" and "System and error messages"
// documents, each code gains a mapping to the corresponding NDIA reason
// (tracked in docs/plans/stage-1.md) — codes are never invented as NDIA's.

export const REASONS = {
	// Catalogue / price
	NO_CATALOGUE_FOR_DATE: {
		severity: "fail",
		message:
			"No price catalogue version covers the service date, so the claim cannot be validated against a price limit.",
	},
	ITEM_NOT_IN_CATALOGUE: {
		severity: "fail",
		message:
			"The support item number does not exist in the catalogue version effective on the service date.",
	},
	PRICE_ABOVE_LIMIT: {
		severity: "fail",
		message:
			"The unit price is above the maximum price limit for this support item at this location.",
	},
	QUOTE_REQUIRED: {
		severity: "review",
		message:
			"This support item requires an agreed quote; the price limit alone cannot clear it. A human must confirm the quote.",
	},
	// Dates
	INVALID_DATE_FORMAT: {
		severity: "fail",
		message:
			"A service date is not a real calendar date in strict YYYY-MM-DD format, which the NDIA portal rejects.",
	},
	DATE_RANGE_INVERTED: {
		severity: "fail",
		message: "The service end date is before the service start date.",
	},
	SERVICE_DATE_IN_FUTURE: {
		severity: "fail",
		message:
			"The service period ends in the future; supports cannot be claimed before delivery.",
	},
	OUTSIDE_PLAN_DATES: {
		severity: "fail",
		message:
			"The service period falls outside the participant's plan start and end dates.",
	},
	// Participant / plan linkage
	PLAN_PARTICIPANT_MISMATCH: {
		severity: "fail",
		message:
			"The NDIS number on the claim does not match the participant on the plan.",
	},
	// Budget
	BUDGET_CATEGORY_MISSING: {
		severity: "fail",
		message:
			"The participant's plan has no budget for the support category this item draws from.",
	},
	BUDGET_EXCEEDED: {
		severity: "fail",
		message:
			"The line total exceeds the remaining budget in its support category, counting earlier lines in this batch.",
	},
	// Amounts
	INVALID_QUANTITY: {
		severity: "fail",
		message:
			"Quantity must be a positive number with at most 4 decimal places.",
	},
	INVALID_UNIT_PRICE: {
		severity: "fail",
		message: "Unit price must be a positive whole number of cents.",
	},
	// Claim type codes
	INVALID_CLAIM_TYPE: {
		severity: "fail",
		message:
			"The claim type code is not in the list of valid codes (codes must be uppercase; blank means standard service).",
	},
	CANCELLATION_REASON_MISSING: {
		severity: "fail",
		message:
			"Cancellation claims (CANC) must carry a cancellation reason code.",
	},
	INVALID_CANCELLATION_REASON: {
		severity: "fail",
		message: "The cancellation reason code is not in the list of valid codes.",
	},
	CANCELLATION_REASON_UNEXPECTED: {
		severity: "fail",
		message: "A cancellation reason is present but the claim type is not CANC.",
	},
	// Duplicates
	DUPLICATE_IN_BATCH: {
		severity: "fail",
		message:
			"Another line in this batch claims the same participant, support item, dates and provider.",
	},
	DUPLICATE_OF_HISTORY: {
		severity: "fail",
		message:
			"A previously submitted claim already covers the same participant, support item, dates and provider.",
	},
	// Bulk CSV shape
	MISSING_REQUIRED_FIELD: {
		severity: "fail",
		message:
			"A required column is empty; the NDIA bulk upload rejects incomplete rows.",
	},
	INVALID_MONEY_FORMAT: {
		severity: "fail",
		message:
			"UnitPrice must be a plain decimal amount with at most 2 decimal places.",
	},
	INVALID_NUMBER_FORMAT: {
		severity: "fail",
		message: "Quantity and Hours must be plain positive numbers.",
	},
	QUANTITY_AND_HOURS_BOTH_SET: {
		severity: "fail",
		message: "A row must use Quantity or Hours, not both.",
	},
	QUANTITY_AND_HOURS_BOTH_EMPTY: {
		severity: "fail",
		message: "A row must set Quantity or Hours.",
	},
	FILENAME_TOO_LONG: {
		severity: "fail",
		message:
			"The bulk upload filename exceeds 20 characters including .CSV, which the portal rejects.",
	},
	FILENAME_NOT_CSV: {
		severity: "fail",
		message: "The bulk upload filename must end in .CSV.",
	},
} as const;

export type ReasonCode = keyof typeof REASONS;

export function finding(code: ReasonCode): {
	code: ReasonCode;
	severity: "fail" | "review";
	message: string;
} {
	const r = REASONS[code];
	return { code, severity: r.severity, message: r.message };
}
