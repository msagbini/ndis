import { describe, expect, it } from "vitest";
import { findCatalogueVersion, findSupportItem } from "./catalogue.js";
import { isOnOrBefore, isValidIsoDate } from "./dates.js";
import {
	formatCentsAsDollars,
	isValidQuantity,
	lineTotalCents,
	parseMoneyToCents,
} from "./money.js";
import { finding, REASONS } from "./reasons.js";
import type { CatalogueVersion } from "./types.js";

describe("money", () => {
	it("parses plain decimals to cents", () => {
		expect(parseMoneyToCents("0")).toBe(0);
		expect(parseMoneyToCents("60")).toBe(6000);
		expect(parseMoneyToCents("60.5")).toBe(6050);
		expect(parseMoneyToCents("60.05")).toBe(6005);
		expect(parseMoneyToCents("1234567890.99")).toBe(123456789099);
	});

	it("rejects everything that is not a plain decimal", () => {
		for (const bad of [
			"",
			"-1",
			"+1",
			"1.005",
			"1,000",
			"$1",
			"1e3",
			"1.",
			".5",
			"abc",
			"12345678901",
		]) {
			expect(parseMoneyToCents(bad), bad).toBeNull();
		}
	});

	it("formats cents as dollars", () => {
		expect(formatCentsAsDollars(0)).toBe("0.00");
		expect(formatCentsAsDollars(6005)).toBe("60.05");
		expect(formatCentsAsDollars(6350)).toBe("63.50");
	});

	it("validates quantities to 4 decimal places", () => {
		expect(isValidQuantity(1)).toBe(true);
		expect(isValidQuantity(0.0001)).toBe(true);
		expect(isValidQuantity(2.0001)).toBe(true);
		expect(isValidQuantity(0)).toBe(false);
		expect(isValidQuantity(-1)).toBe(false);
		expect(isValidQuantity(1.00001)).toBe(false);
		expect(isValidQuantity(100000)).toBe(false);
		expect(isValidQuantity(99999.9999)).toBe(true);
		expect(isValidQuantity(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isValidQuantity(Number.NaN)).toBe(false);
	});

	it("computes exact line totals without float drift", () => {
		expect(lineTotalCents(1, 6000)).toBe(6000);
		expect(lineTotalCents(1.5, 6000)).toBe(9000);
		expect(lineTotalCents(0.1, 6000)).toBe(600);
		expect(lineTotalCents(1.3333, 6000)).toBe(8000);
		expect(lineTotalCents(2.0001, 19000)).toBe(38002);
		// The classic float trap: 0.1 + 0.2 style inputs still land exactly.
		expect(lineTotalCents(0.3, 1000)).toBe(300);
	});
});

describe("dates", () => {
	it("accepts real strict ISO dates", () => {
		for (const good of [
			"2026-01-01",
			"2026-12-31",
			"2024-02-29",
			"2000-02-29",
			"2026-02-28",
		]) {
			expect(isValidIsoDate(good), good).toBe(true);
		}
	});

	it("rejects malformed and impossible dates", () => {
		for (const bad of [
			"2026-2-05",
			"2026-02-5",
			"26-02-05",
			"2026/02/05",
			"2026-13-01",
			"2026-00-01",
			"2026-01-00",
			"2026-01-32",
			"2026-02-30",
			"2026-04-31",
			"2026-02-29", // 2026 is not a leap year
			"1900-02-29", // century non-leap
			"",
			"garbage",
		]) {
			expect(isValidIsoDate(bad), bad).toBe(false);
		}
	});

	it("accepts century leap year 2000", () => {
		expect(isValidIsoDate("2000-02-29")).toBe(true);
	});

	it("compares chronologically", () => {
		expect(isOnOrBefore("2026-01-01", "2026-01-02")).toBe(true);
		expect(isOnOrBefore("2026-01-02", "2026-01-02")).toBe(true);
		expect(isOnOrBefore("2026-01-03", "2026-01-02")).toBe(false);
	});
});

describe("catalogue lookup", () => {
	const versions: CatalogueVersion[] = [
		{
			versionId: "A",
			source: "FIXTURE",
			effectiveFrom: "2025-07-01",
			effectiveTo: "2026-06-30",
			items: [],
		},
	];

	it("finds the version covering a date, boundaries inclusive", () => {
		expect(findCatalogueVersion(versions, "2025-07-01")?.versionId).toBe("A");
		expect(findCatalogueVersion(versions, "2026-06-30")?.versionId).toBe("A");
		expect(findCatalogueVersion(versions, "2026-07-01")).toBeNull();
		expect(findCatalogueVersion(versions, "2025-06-30")).toBeNull();
	});

	it("finds items by number", () => {
		const version: CatalogueVersion = {
			...versions[0],
			items: [
				{
					supportItemNumber: "FX_X",
					supportItemName: "x",
					supportCategoryNumber: "FX_C",
					unit: "H",
					quoteRequired: false,
					priceLimitCents: { national: 1, remote: 1, veryRemote: 1 },
				},
			],
		} as CatalogueVersion;
		expect(findSupportItem(version, "FX_X")?.supportItemName).toBe("x");
		expect(findSupportItem(version, "FX_Y")).toBeNull();
	});
});

describe("reasons", () => {
	it("every code has a severity and a message", () => {
		for (const code of Object.keys(REASONS) as (keyof typeof REASONS)[]) {
			const f = finding(code);
			expect(f.code).toBe(code);
			expect(["fail", "review"]).toContain(f.severity);
			expect(f.message.length).toBeGreaterThan(10);
		}
	});
});
