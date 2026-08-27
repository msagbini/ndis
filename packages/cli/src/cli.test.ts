import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseCsv } from "./csv.js";
import { runCli } from "./main.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const seed = (p: string) => join(root, "seed", p);

function run(args: string[]): { code: number; out: string[]; err: string[] } {
	const out: string[] = [];
	const err: string[] = [];
	const code = runCli(args, {
		log: (l) => out.push(l),
		error: (l) => err.push(l),
	});
	return { code, out, err };
}

const FULL_ARGS = [
	"validate",
	seed("FIXTURE_demo/FIXTURE_claims.csv"),
	"--plan",
	seed("FIXTURE_golden-set/FIXTURE_plan.json"),
	"--catalogue",
	seed("FIXTURE_golden-set/FIXTURE_catalogue.json"),
	"--config",
	seed("FIXTURE_golden-set/FIXTURE_config.json"),
	"--date",
	"2026-08-27",
];

describe("csv parser", () => {
	it("handles quotes, escaped quotes and CRLF", () => {
		expect(parseCsv('a,"b,c",d\r\n"say ""hi""",2,\n')).toEqual([
			["a", "b,c", "d"],
			['say "hi"', "2", ""],
		]);
	});

	it("rejects an unterminated quote", () => {
		expect(() => parseCsv('a,"broken')).toThrow(/Unterminated/);
	});
});

describe("runCli", () => {
	it("validates the demo file end to end", () => {
		const { code, out } = run(FULL_ARGS);
		expect(code).toBe(1); // demo file intentionally contains failures
		const text = out.join("\n");
		expect(text).toContain("DEMO-OK: PASS ($120.00)");
		expect(text).toContain("DEMO-CARO: FAIL");
		expect(text).toContain("[PRICE_ABOVE_LIMIT]");
		expect(text).toContain("DEMO-FUTURO: FAIL");
		expect(text).toContain("DEMO-DUP: FAIL");
		expect(text).toContain("[DUPLICATE_IN_BATCH]");
		expect(text).toContain("DEMO-COTIZ: NEEDS_REVIEW");
		expect(text).toContain("DEMO-CANC: PASS");
		expect(text).toContain("Summary: 6 lines — 2 pass, 3 fail, 1 need review");
	});

	it("fails with usage on missing arguments", () => {
		const { code, err } = run(["validate"]);
		expect(code).toBe(2);
		expect(err[0]).toContain("Usage:");
	});

	it("rejects unknown columns", () => {
		const { code, err } = run([
			"validate",
			seed("FIXTURE_golden-set/FIXTURE_plan.json"), // any file with non-column text
			...FULL_ARGS.slice(2),
		]);
		expect(code).toBe(2);
		expect(err.join("\n")).toContain("Unknown CSV columns");
	});
});
