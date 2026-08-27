// @claimguard/rules — deterministic claim-validation engine.
// Pure logic: no network, no database, no AI. Money and eligibility verdicts
// come only from this package (the project's core architectural rule).

export { findCatalogueVersion, findSupportItem } from "./catalogue.js";
export type { BulkCsvRow } from "./csvShape.js";
export {
	BULK_CSV_COLUMNS,
	validateBulkCsvRow,
	validateBulkFilename,
} from "./csvShape.js";
export { isOnOrBefore, isValidIsoDate } from "./dates.js";
export { duplicateKey, validateClaim, validateClaims } from "./engine.js";
export {
	formatCentsAsDollars,
	isValidQuantity,
	lineTotalCents,
	parseMoneyToCents,
} from "./money.js";
export type { ReasonCode } from "./reasons.js";
export { finding, REASONS } from "./reasons.js";
export type {
	BudgetCategory,
	CatalogueVersion,
	ClaimLine,
	EngineConfig,
	LineResult,
	LocationClass,
	Plan,
	RuleFinding,
	SupportItem,
	ValidationContext,
	Verdict,
} from "./types.js";
