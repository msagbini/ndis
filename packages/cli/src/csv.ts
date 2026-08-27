// Minimal RFC-4180 CSV reader: quoted fields, escaped quotes ("" inside a
// quoted field), CRLF or LF line endings. No streaming — bulk claim files
// are small (the NDIA caps filename length, and rows are claim lines).

export function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let field = "";
	let row: string[] = [];
	let inQuotes = false;
	let i = 0;

	const endField = () => {
		row.push(field);
		field = "";
	};
	const endRow = () => {
		endField();
		rows.push(row);
		row = [];
	};

	while (i < text.length) {
		const ch = text[i] as string;
		if (inQuotes) {
			if (ch === '"') {
				if (text[i + 1] === '"') {
					field += '"';
					i += 2;
					continue;
				}
				inQuotes = false;
				i += 1;
				continue;
			}
			field += ch;
			i += 1;
			continue;
		}
		if (ch === '"' && field === "") {
			inQuotes = true;
			i += 1;
			continue;
		}
		if (ch === ",") {
			endField();
			i += 1;
			continue;
		}
		if (ch === "\n") {
			endRow();
			i += 1;
			continue;
		}
		if (ch === "\r") {
			if (text[i + 1] === "\n") {
				endRow();
				i += 2;
				continue;
			}
			endRow();
			i += 1;
			continue;
		}
		field += ch;
		i += 1;
	}
	if (inQuotes) {
		throw new Error("Unterminated quoted field in CSV.");
	}
	if (field !== "" || row.length > 0) {
		endRow();
	}
	// A trailing newline produces a final empty row; drop it.
	if (
		rows.length > 0 &&
		(rows[rows.length - 1] as string[]).every((f) => f === "")
	) {
		rows.pop();
	}
	return rows;
}
