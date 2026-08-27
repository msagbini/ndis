import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
	type BulkCsvRow,
	validateBulkCsvRow,
	validateBulkFilename,
} from "./csvShape.js";
import type { ReasonCode } from "./reasons.js";

const seedDir = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../../seed/FIXTURE_golden-set",
);
const data = JSON.parse(
	readFileSync(join(seedDir, "FIXTURE_csv-cases.json"), "utf8"),
) as {
	rows: { name: string; row: BulkCsvRow; codes: ReasonCode[] }[];
	filenames: { name: string; filename: string; codes: ReasonCode[] }[];
};

describe("bulk CSV row shape", () => {
	for (const rowCase of data.rows) {
		it(rowCase.name, () => {
			const codes = validateBulkCsvRow(rowCase.row)
				.map((f) => f.code)
				.sort();
			expect(codes).toEqual([...rowCase.codes].sort());
		});
	}

	it("treats absent keys like empty strings", () => {
		const codes = validateBulkCsvRow({}).map((f) => f.code);
		expect(codes).toContain("MISSING_REQUIRED_FIELD");
		expect(codes).toContain("QUANTITY_AND_HOURS_BOTH_EMPTY");
	});
});

describe("bulk filename", () => {
	for (const fnCase of data.filenames) {
		it(fnCase.name, () => {
			const codes = validateBulkFilename(fnCase.filename)
				.map((f) => f.code)
				.sort();
			expect(codes).toEqual([...fnCase.codes].sort());
		});
	}
});
