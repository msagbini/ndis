import { describe, expect, it } from "vitest";
import { PACKAGE_NAME } from "./index.js";

// Harness smoke test: proves TypeScript compilation, the test runner, and CI
// are wired correctly before any real logic exists.
describe("test harness", () => {
	it("compiles and runs", () => {
		expect(PACKAGE_NAME).toBe("@claimguard/rules");
	});
});
