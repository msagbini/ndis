import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Architectural invariant: the rules engine is pure. No network, no database,
// no AI, no filesystem, no clock — everything arrives as function arguments.
// Test files may use node builtins to load fixtures; production sources may
// import nothing but their own relative modules.

const srcDir = dirname(fileURLToPath(import.meta.url));
const productionFiles = readdirSync(srcDir).filter(
	(f) => f.endsWith(".ts") && !f.endsWith(".test.ts"),
);

const IMPORT_RE = /from\s+"([^"]+)"/g;

describe("purity of packages/rules", () => {
	it("covers the expected production files", () => {
		expect(productionFiles.sort()).toEqual([
			"catalogue.ts",
			"csvShape.ts",
			"dates.ts",
			"engine.ts",
			"index.ts",
			"money.ts",
			"reasons.ts",
			"types.ts",
		]);
	});

	for (const file of productionFiles) {
		it(`${file} imports only relative modules`, () => {
			const source = readFileSync(join(srcDir, file), "utf8");
			for (const match of source.matchAll(IMPORT_RE)) {
				expect(match[1], `import "${match[1]}" in ${file}`).toMatch(/^\.\.?\//);
			}
		});
	}

	it("declares no runtime dependencies", () => {
		const pkg = JSON.parse(
			readFileSync(join(srcDir, "../package.json"), "utf8"),
		) as {
			dependencies?: Record<string, string>;
		};
		expect(pkg.dependencies).toBeUndefined();
	});

	it("uses no ambient time or randomness", () => {
		for (const file of productionFiles) {
			const source = readFileSync(join(srcDir, file), "utf8");
			expect(source, file).not.toMatch(/Date\.now|new Date|Math\.random/);
		}
	});
});
