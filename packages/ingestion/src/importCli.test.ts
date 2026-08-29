import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ExcelJS from "exceljs";
import { describe, expect, it } from "vitest";
import { EXPECTED_HEADERS } from "./catalogueParser.js";
import { runImport } from "./importCli.js";

async function fixtureXlsx(dir: string): Promise<string> {
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet("Catalogue");
	sheet.addRow([...EXPECTED_HEADERS]);
	sheet.addRow([
		"FX_I_01",
		"FIXTURE import item",
		"FX_CAT_1",
		"H",
		"N",
		"60.00",
		"84.00",
		"90.00",
	]);
	const path = join(dir, "FIXTURE_cat.xlsx");
	writeFileSync(path, Buffer.from(await workbook.xlsx.writeBuffer()));
	return path;
}

function run(
	args: string[],
): Promise<number> & { out: string[]; err: string[] } {
	const out: string[] = [];
	const err: string[] = [];
	const promise = runImport(args, {
		log: (l) => out.push(l),
		error: (l) => err.push(l),
	}) as Promise<number> & { out: string[]; err: string[] };
	promise.out = out;
	promise.err = err;
	return promise;
}

describe("import-catalogue CLI", () => {
	it("writes an engine-ready CatalogueVersion[] with provenance", async () => {
		const dir = mkdtempSync(join(tmpdir(), "cat-import-"));
		const xlsx = await fixtureXlsx(dir);
		const out = join(dir, "FIXTURE_out.json");
		const p = run([
			xlsx,
			"--version-id",
			"FIXTURE-IMP",
			"--source",
			"FIXTURE test file",
			"--from",
			"2026-07-01",
			"--to",
			"2027-06-30",
			"--out",
			out,
		]);
		expect(await p).toBe(0);
		const written = JSON.parse(readFileSync(out, "utf8")) as {
			versionId: string;
			source: string;
			items: { priceLimitCents: { national: number } }[];
		}[];
		expect(written).toHaveLength(1);
		expect(written[0]?.versionId).toBe("FIXTURE-IMP");
		expect(written[0]?.source).toMatch(
			/^FIXTURE test file \(sha256 [0-9a-f]{64}\)$/,
		);
		expect(written[0]?.items[0]?.priceLimitCents.national).toBe(6000);
		expect(p.out.join("\n")).toMatch(/ok: 1 support items/);
	});

	it("fails with usage when flags are missing", async () => {
		const p = run(["file.xlsx"]);
		expect(await p).toBe(2);
		expect(p.err[0]).toContain("Usage:");
	});
});
