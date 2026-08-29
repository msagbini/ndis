import { readFileSync, writeFileSync } from "node:fs";
import {
	CatalogueParseError,
	parseSupportCatalogue,
} from "./catalogueParser.js";

// Thin command-line wrapper used by the ndis-price-validator skill:
//   import-catalogue <catalogue.xlsx> --version-id <id> --source "<provenance>" \
//     --from YYYY-MM-DD --to YYYY-MM-DD --out <seed.json>
// Writes a CatalogueVersion[] JSON (the exact shape the engine and demo CLI
// consume) and prints the SHA-256 + row count for the provenance record.

interface Io {
	log: (line: string) => void;
	error: (line: string) => void;
}

const USAGE =
	'Usage: import-catalogue <catalogue.xlsx> --version-id <id> --source "<provenance>" --from <YYYY-MM-DD> --to <YYYY-MM-DD> --out <seed.json>';

function readFlag(args: string[], name: string): string | null {
	const index = args.indexOf(`--${name}`);
	if (index === -1 || index + 1 >= args.length) {
		return null;
	}
	return args[index + 1] as string;
}

export async function runImport(args: string[], io: Io): Promise<number> {
	const xlsxPath = args[0];
	const versionId = readFlag(args, "version-id");
	const source = readFlag(args, "source");
	const effectiveFrom = readFlag(args, "from");
	const effectiveTo = readFlag(args, "to");
	const outPath = readFlag(args, "out");
	if (
		xlsxPath === undefined ||
		xlsxPath.startsWith("--") ||
		versionId === null ||
		source === null ||
		effectiveFrom === null ||
		effectiveTo === null ||
		outPath === null
	) {
		io.error(USAGE);
		return 2;
	}

	try {
		const bytes = readFileSync(xlsxPath);
		const result = await parseSupportCatalogue(bytes, {
			versionId,
			source,
			effectiveFrom,
			effectiveTo,
		});
		const catalogue = {
			...result.catalogue,
			source: `${source} (sha256 ${result.sha256})`,
		};
		writeFileSync(outPath, `${JSON.stringify([catalogue], null, "\t")}\n`);
		io.log(`ok: ${result.rowCount} support items -> ${outPath}`);
		io.log(`sha256: ${result.sha256}`);
		return 0;
	} catch (error) {
		if (error instanceof CatalogueParseError) {
			io.error(`Catalogue rejected: ${error.message}`);
			return 1;
		}
		throw error;
	}
}

if (
	process.argv[1]?.endsWith("importCli.ts") ||
	process.argv[1]?.endsWith("importCli.js")
) {
	runImport(process.argv.slice(2), {
		log: (l) => console.log(l),
		error: (l) => console.error(l),
	}).then((code) => {
		process.exitCode = code;
	});
}
