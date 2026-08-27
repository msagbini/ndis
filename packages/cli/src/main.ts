import { readFileSync } from "node:fs";
import { basename } from "node:path";
import {
	BULK_CSV_COLUMNS,
	type BulkCsvRow,
	type CatalogueVersion,
	type ClaimLine,
	type EngineConfig,
	formatCentsAsDollars,
	type LocationClass,
	type Plan,
	parseMoneyToCents,
	validateBulkCsvRow,
	validateBulkFilename,
	validateClaims,
} from "@claimguard/rules";
import { parseCsv } from "./csv.js";

// Usage:
//   validate <claims.csv> --plan plan.json --catalogue catalogue.json \
//     --config config.json --date YYYY-MM-DD [--location national|remote|veryRemote]
//
// The CSV has no location column, so one location class applies to the whole
// file (default: national).

const USAGE =
	"Usage: validate <claims.csv> --plan <plan.json> --catalogue <catalogue.json> --config <config.json> --date <YYYY-MM-DD> [--location national|remote|veryRemote]";

interface Io {
	log: (line: string) => void;
	error: (line: string) => void;
}

function readFlag(args: string[], name: string): string | null {
	const index = args.indexOf(`--${name}`);
	if (index === -1 || index + 1 >= args.length) {
		return null;
	}
	return args[index + 1] as string;
}

function toRecord(header: string[], fields: string[]): BulkCsvRow {
	const record: Record<string, string> = {};
	header.forEach((column, i) => {
		record[column] = fields[i] ?? "";
	});
	return record as BulkCsvRow;
}

function toClaimLine(row: BulkCsvRow, location: LocationClass): ClaimLine {
	const quantityRaw =
		(row.Quantity ?? "") !== "" ? (row.Quantity as string) : (row.Hours ?? "");
	return {
		claimReference: row.ClaimReference ?? "",
		registrationNumber: row.RegistrationNumber ?? "",
		ndisNumber: row.NDISNumber ?? "",
		supportsDeliveredFrom: row.SupportsDeliveredFrom ?? "",
		supportsDeliveredTo: row.SupportsDeliveredTo ?? "",
		supportNumber: row.SupportNumber ?? "",
		quantity: Number(quantityRaw),
		unitPriceCents: parseMoneyToCents(row.UnitPrice ?? "") ?? -1,
		claimType: row.ClaimType ?? "",
		cancellationReason: row.CancellationReason ?? "",
		locationClass: location,
	};
}

export function runCli(args: string[], io: Io): number {
	if (args[0] !== "validate" || args.length < 2) {
		io.error(USAGE);
		return 2;
	}
	const csvPath = args[1] as string;
	const planPath = readFlag(args, "plan");
	const cataloguePath = readFlag(args, "catalogue");
	const configPath = readFlag(args, "config");
	const date = readFlag(args, "date");
	const location = (readFlag(args, "location") ?? "national") as LocationClass;
	if (
		planPath === null ||
		cataloguePath === null ||
		configPath === null ||
		date === null
	) {
		io.error(USAGE);
		return 2;
	}

	const plan = JSON.parse(readFileSync(planPath, "utf8")) as Plan;
	const catalogue = JSON.parse(
		readFileSync(cataloguePath, "utf8"),
	) as CatalogueVersion[];
	const config = JSON.parse(readFileSync(configPath, "utf8")) as EngineConfig;
	const csvText = readFileSync(csvPath, "utf8");

	io.log(
		`Validating ${basename(csvPath)} for plan ${plan.planId} (as of ${date})`,
	);

	for (const f of validateBulkFilename(basename(csvPath))) {
		io.log(`FILE WARNING [${f.code}] ${f.message}`);
	}

	const rows = parseCsv(csvText);
	const header = rows[0];
	if (header === undefined) {
		io.error("The CSV file is empty.");
		return 2;
	}
	const unknown = header.filter(
		(c) => !(BULK_CSV_COLUMNS as readonly string[]).includes(c),
	);
	if (unknown.length > 0) {
		io.error(`Unknown CSV columns: ${unknown.join(", ")}`);
		return 2;
	}

	const records = rows.slice(1).map((fields) => toRecord(header, fields));

	// Layer 1: upload-time shape problems (what the portal itself rejects).
	let shapeFailures = 0;
	records.forEach((record, i) => {
		for (const f of validateBulkCsvRow(record)) {
			shapeFailures += 1;
			io.log(`ROW ${i + 2} SHAPE [${f.code}] ${f.message}`);
		}
	});

	// Layer 2: the engine verdicts.
	const lines = records.map((r) => toClaimLine(r, location));
	const results = validateClaims(lines, {
		plan,
		catalogue,
		config,
		validationDate: date,
	});

	let failed = 0;
	let review = 0;
	for (const result of results) {
		const total =
			result.lineTotalCents === null
				? ""
				: ` ($${formatCentsAsDollars(result.lineTotalCents)})`;
		io.log(`${result.claimReference}: ${result.verdict}${total}`);
		for (const f of result.findings) {
			io.log(`   [${f.code}] ${f.message}`);
		}
		if (result.verdict === "FAIL") {
			failed += 1;
		}
		if (result.verdict === "NEEDS_REVIEW") {
			review += 1;
		}
	}

	const passed = results.length - failed - review;
	io.log(
		`Summary: ${results.length} lines — ${passed} pass, ${failed} fail, ${review} need review${shapeFailures > 0 ? `; ${shapeFailures} upload-format problems` : ""}`,
	);
	return failed > 0 || shapeFailures > 0 ? 1 : 0;
}

// Invoked directly (not imported by tests): run with process I/O.
if (
	process.argv[1]?.endsWith("main.ts") ||
	process.argv[1]?.endsWith("main.js")
) {
	const code = runCli(process.argv.slice(2), {
		log: (l) => console.log(l),
		error: (l) => console.error(l),
	});
	process.exitCode = code;
}
