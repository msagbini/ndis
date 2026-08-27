import ExcelJS from "exceljs";
import { describe, expect, it } from "vitest";
import {
	CatalogueParseError,
	EXPECTED_HEADERS,
	parseSupportCatalogue,
} from "./catalogueParser.js";

// The fixture XLSX is generated in-memory with the parser's canonical layout.
// When the official file arrives, a second test loads the real bytes and the
// header mapping gets adjusted deliberately.

type Cell = string | number;

async function workbookBytes(rows: Cell[][]): Promise<Buffer> {
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet("Catalogue");
	for (const row of rows) {
		sheet.addRow(row);
	}
	return Buffer.from(await workbook.xlsx.writeBuffer());
}

const HEADERS: Cell[] = [...EXPECTED_HEADERS];
const GOOD_ROWS: Cell[][] = [
	HEADERS,
	[
		"FX_A_01",
		"FIXTURE item A",
		"FX_CAT_1",
		"H",
		"N",
		"60.00",
		"84.00",
		"90.00",
	],
	[
		"FX_B_02",
		"FIXTURE item B",
		"FX_CAT_2",
		"EA",
		"Y",
		"190.00",
		"266.00",
		"285.00",
	],
	["FX_C_03", "FIXTURE item C", "FX_CAT_1", "H", "", "63.55", "88.97", "95.33"],
];

const OPTIONS = {
	versionId: "FIXTURE-TEST",
	source: "FIXTURE workbook generated in tests",
	effectiveFrom: "2026-07-01",
	effectiveTo: "2027-06-30",
};

describe("parseSupportCatalogue", () => {
	it("round-trips a well-formed catalogue", async () => {
		const bytes = await workbookBytes(GOOD_ROWS);
		const result = await parseSupportCatalogue(bytes, OPTIONS);
		expect(result.rowCount).toBe(3);
		expect(result.sha256).toMatch(/^[0-9a-f]{64}$/);
		expect(result.catalogue.versionId).toBe("FIXTURE-TEST");
		expect(result.catalogue.items[0]).toEqual({
			supportItemNumber: "FX_A_01",
			supportItemName: "FIXTURE item A",
			supportCategoryNumber: "FX_CAT_1",
			unit: "H",
			quoteRequired: false,
			priceLimitCents: { national: 6000, remote: 8400, veryRemote: 9000 },
		});
		expect(result.catalogue.items[1]?.quoteRequired).toBe(true);
		expect(result.catalogue.items[2]?.priceLimitCents.national).toBe(6355);
	});

	it("checksum changes when a single price changes", async () => {
		const a = await parseSupportCatalogue(
			await workbookBytes(GOOD_ROWS),
			OPTIONS,
		);
		const altered = GOOD_ROWS.map((r) => [...r]);
		(altered[1] as Cell[])[5] = "60.01";
		const b = await parseSupportCatalogue(
			await workbookBytes(altered),
			OPTIONS,
		);
		expect(a.sha256).not.toBe(b.sha256);
	});

	it("skips fully empty rows", async () => {
		const rows = [...GOOD_ROWS, ["", "", "", "", "", "", "", ""]];
		const result = await parseSupportCatalogue(
			await workbookBytes(rows),
			OPTIONS,
		);
		expect(result.rowCount).toBe(3);
	});

	it("rejects unexpected headers, showing expected vs found", async () => {
		const rows = [
			["Item", "Name", "Cat", "Unit", "Quote", "P1", "P2", "P3"],
			...GOOD_ROWS.slice(1),
		];
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(/Unexpected column headers[\s\S]*Expected:[\s\S]*Found:/);
	});

	it("rejects a bad price with the row number", async () => {
		const rows = GOOD_ROWS.map((r) => [...r]);
		(rows[2] as Cell[])[6] = "not-money";
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(/Row 3: "Price Limit Remote" is "not-money"/);
	});

	it("rejects zero prices", async () => {
		const rows = GOOD_ROWS.map((r) => [...r]);
		(rows[1] as Cell[])[5] = "0";
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(CatalogueParseError);
	});

	it("rejects an unknown quote flag", async () => {
		const rows = GOOD_ROWS.map((r) => [...r]);
		(rows[1] as Cell[])[4] = "MAYBE";
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(/Quote Required.*MAYBE/);
	});

	it("rejects duplicate item numbers", async () => {
		const rows = [
			...GOOD_ROWS,
			["FX_A_01", "Dup", "FX_CAT_1", "H", "N", "1.00", "1.00", "1.00"],
		];
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(/duplicate support item number "FX_A_01"/);
	});

	it("rejects rows with missing identity fields", async () => {
		const rows = [
			...GOOD_ROWS,
			["FX_D_04", "", "FX_CAT_1", "H", "N", "1.00", "1.00", "1.00"],
		];
		await expect(
			parseSupportCatalogue(await workbookBytes(rows), OPTIONS),
		).rejects.toThrow(/must all be non-empty/);
	});

	it("rejects an empty data set", async () => {
		await expect(
			parseSupportCatalogue(await workbookBytes([HEADERS]), OPTIONS),
		).rejects.toThrow(/no data rows/);
	});

	it("output feeds the rules engine's catalogue lookup directly", async () => {
		const { findCatalogueVersion, findSupportItem } = await import(
			"@claimguard/rules"
		);
		const { catalogue } = await parseSupportCatalogue(
			await workbookBytes(GOOD_ROWS),
			OPTIONS,
		);
		const version = findCatalogueVersion([catalogue], "2026-08-15");
		expect(version?.versionId).toBe("FIXTURE-TEST");
		expect(
			findSupportItem(version as NonNullable<typeof version>, "FX_B_02")
				?.quoteRequired,
		).toBe(true);
	});
});
