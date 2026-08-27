import { describe, expect, it } from "vitest";
import type {
	CatalogueVersion,
	ClaimLine,
	ValidationContext,
} from "./index.js";
import { validateClaim } from "./index.js";

// Exercises the public single-line entry point end to end.

const catalogue: CatalogueVersion[] = [
	{
		versionId: "FIXTURE-SMOKE",
		source: "FIXTURE inline test data",
		effectiveFrom: "2026-01-01",
		effectiveTo: "2026-12-31",
		items: [
			{
				supportItemNumber: "FX_SMOKE_ITEM",
				supportItemName: "FIXTURE smoke item",
				supportCategoryNumber: "FX_SMOKE_CAT",
				unit: "H",
				quoteRequired: false,
				priceLimitCents: { national: 5000, remote: 7000, veryRemote: 7500 },
			},
		],
	},
];

const ctx: ValidationContext = {
	plan: {
		planId: "FX_SMOKE_PLAN",
		ndisNumber: "FX0000042",
		startDate: "2026-01-01",
		endDate: "2026-12-31",
		budgets: [
			{
				supportCategoryNumber: "FX_SMOKE_CAT",
				allocatedCents: 10000,
				spentCents: 0,
			},
		],
	},
	catalogue,
	validationDate: "2026-08-27",
	config: { claimTypes: ["CANC"], cancellationReasons: ["FXCR_OTHER"] },
};

const line: ClaimLine = {
	claimReference: "FXSMOKE1",
	registrationNumber: "FXREG042",
	ndisNumber: "FX0000042",
	supportsDeliveredFrom: "2026-03-02",
	supportsDeliveredTo: "2026-03-02",
	supportNumber: "FX_SMOKE_ITEM",
	quantity: 2,
	unitPriceCents: 5000,
	claimType: "",
	cancellationReason: "",
	locationClass: "national",
};

describe("validateClaim", () => {
	it("passes a clean line and reports its total", () => {
		const result = validateClaim(line, ctx);
		expect(result.verdict).toBe("PASS");
		expect(result.findings).toEqual([]);
		expect(result.lineTotalCents).toBe(10000);
	});

	it("fails and explains an over-limit line", () => {
		const result = validateClaim({ ...line, unitPriceCents: 5001 }, ctx);
		expect(result.verdict).toBe("FAIL");
		expect(result.findings.map((f) => f.code)).toEqual(["PRICE_ABOVE_LIMIT"]);
		expect(result.findings[0]?.message).toContain("maximum price limit");
	});
});
