import { createHash } from "node:crypto";
import type { CatalogueVersion, SupportItem } from "@claimguard/rules";
import { parseMoneyToCents } from "@claimguard/rules";
import ExcelJS from "exceljs";

// Converts a Support Catalogue spreadsheet into the versioned catalogue data
// the rules engine consumes.
//
// IMPORTANT — provenance: this parser is currently written against OUR
// canonical column layout (below), because the official 2026-27 NDIS Support
// Catalogue file has not been obtainable from this environment
// (docs/research/sources/README.md). The official file's real layout WILL
// differ; when it arrives, the header mapping below is the only part that
// should need adjusting. The parser fails loudly on any unexpected layout —
// it never guesses.

export const EXPECTED_HEADERS = [
	"Support Item Number",
	"Support Item Name",
	"Support Category Number",
	"Unit",
	"Quote Required",
	"Price Limit National",
	"Price Limit Remote",
	"Price Limit Very Remote",
] as const;

export interface ParseOptions {
	versionId: string;
	// Human-readable provenance recorded into the output, e.g.
	// "NDIS Support Catalogue 2026-27, downloaded 2026-09-01 from ndis.gov.au".
	source: string;
	effectiveFrom: string;
	effectiveTo: string;
}

export interface ParseResult {
	catalogue: CatalogueVersion;
	// SHA-256 of the source file, so any later re-import can prove it parsed
	// the exact same bytes.
	sha256: string;
	rowCount: number;
}

export class CatalogueParseError extends Error {}

function cellText(value: ExcelJS.CellValue): string {
	if (value === null || value === undefined) {
		return "";
	}
	if (typeof value === "object") {
		// Formula/richText cells are not expected in the catalogue; refuse
		// rather than guess their meaning.
		throw new CatalogueParseError(
			"A cell contains a non-plain value (formula, rich text or date object); the catalogue must contain plain text and numbers.",
		);
	}
	return String(value).trim();
}

function priceCents(raw: string, header: string, rowNumber: number): number {
	const cents = parseMoneyToCents(raw);
	if (cents === null || cents === 0) {
		throw new CatalogueParseError(
			`Row ${rowNumber}: "${header}" is "${raw}" — expected a positive dollar amount with at most 2 decimals.`,
		);
	}
	return cents;
}

function quoteRequired(raw: string, rowNumber: number): boolean {
	if (raw === "Y") {
		return true;
	}
	if (raw === "N" || raw === "") {
		return false;
	}
	throw new CatalogueParseError(
		`Row ${rowNumber}: "Quote Required" is "${raw}" — expected "Y", "N" or empty.`,
	);
}

export async function parseSupportCatalogue(
	fileBytes: Buffer,
	options: ParseOptions,
): Promise<ParseResult> {
	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(fileBytes as unknown as ExcelJS.Buffer);
	const sheet = workbook.worksheets[0];
	if (sheet === undefined) {
		throw new CatalogueParseError("The file contains no worksheets.");
	}

	const headerRow = sheet.getRow(1);
	const headers = EXPECTED_HEADERS.map((_, i) =>
		cellText(headerRow.getCell(i + 1).value),
	);
	const expected = [...EXPECTED_HEADERS];
	if (JSON.stringify(headers) !== JSON.stringify(expected)) {
		throw new CatalogueParseError(
			`Unexpected column headers.\nExpected: ${expected.join(" | ")}\nFound:    ${headers.join(" | ")}\nThe file layout differs from the canonical layout this parser was built against; adjust the header mapping deliberately, never silently.`,
		);
	}

	const items: SupportItem[] = [];
	const seenNumbers = new Set<string>();
	for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) {
		const row = sheet.getRow(rowNumber);
		const values = EXPECTED_HEADERS.map((_, i) =>
			cellText(row.getCell(i + 1).value),
		);
		if (values.every((v) => v === "")) {
			continue;
		}
		const [number, name, category, unit, quote, national, remote, veryRemote] =
			values as [
				string,
				string,
				string,
				string,
				string,
				string,
				string,
				string,
			];
		if (number === "" || name === "" || category === "" || unit === "") {
			throw new CatalogueParseError(
				`Row ${rowNumber}: item number, name, category and unit must all be non-empty.`,
			);
		}
		if (seenNumbers.has(number)) {
			throw new CatalogueParseError(
				`Row ${rowNumber}: duplicate support item number "${number}".`,
			);
		}
		seenNumbers.add(number);
		items.push({
			supportItemNumber: number,
			supportItemName: name,
			supportCategoryNumber: category,
			unit,
			quoteRequired: quoteRequired(quote, rowNumber),
			priceLimitCents: {
				national: priceCents(national, "Price Limit National", rowNumber),
				remote: priceCents(remote, "Price Limit Remote", rowNumber),
				veryRemote: priceCents(
					veryRemote,
					"Price Limit Very Remote",
					rowNumber,
				),
			},
		});
	}

	if (items.length === 0) {
		throw new CatalogueParseError(
			"The file has the right headers but no data rows.",
		);
	}

	return {
		catalogue: {
			versionId: options.versionId,
			source: options.source,
			effectiveFrom: options.effectiveFrom,
			effectiveTo: options.effectiveTo,
			items,
		},
		sha256: createHash("sha256").update(fileBytes).digest("hex"),
		rowCount: items.length,
	};
}
