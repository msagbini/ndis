import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateClaims } from "./engine.js";
import type { ReasonCode } from "./reasons.js";
import type {
	CatalogueVersion,
	ClaimLine,
	EngineConfig,
	Plan,
	Verdict,
} from "./types.js";

// The golden set: curated known-good and known-bad claims with expected
// verdicts and reason codes. Data lives in seed/FIXTURE_golden-set/ and is
// entirely fictional. A regression here blocks the merge.

const seedDir = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../../seed/FIXTURE_golden-set",
);
const load = <T>(name: string): T =>
	JSON.parse(readFileSync(join(seedDir, name), "utf8")) as T;

const catalogue = load<CatalogueVersion[]>("FIXTURE_catalogue.json");
const plan = load<Plan>("FIXTURE_plan.json");
const config = load<EngineConfig>("FIXTURE_config.json");

interface GoldenCase {
	name: string;
	validationDate: string;
	lines: ClaimLine[];
	expected: { verdict: Verdict; codes: ReasonCode[] }[];
	priorClaimKeys?: string[];
}

const { cases } = load<{ cases: GoldenCase[] }>("FIXTURE_cases.json");

describe("golden set", () => {
	it("has a meaningful number of cases", () => {
		expect(cases.length).toBeGreaterThanOrEqual(70);
	});

	for (const goldenCase of cases) {
		it(goldenCase.name, () => {
			const results = validateClaims(goldenCase.lines, {
				plan,
				catalogue,
				config,
				validationDate: goldenCase.validationDate,
				...(goldenCase.priorClaimKeys
					? { priorClaimKeys: goldenCase.priorClaimKeys }
					: {}),
			});
			expect(results).toHaveLength(goldenCase.expected.length);
			results.forEach((result, i) => {
				const expected = goldenCase.expected[i];
				expect(expected).toBeDefined();
				if (expected) {
					expect(result.verdict, `line ${i} verdict`).toBe(expected.verdict);
					const actualCodes = result.findings.map((f) => f.code).sort();
					expect(actualCodes, `line ${i} codes`).toEqual(
						[...expected.codes].sort(),
					);
				}
			});
		});
	}
});
