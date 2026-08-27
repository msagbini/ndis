// Strict ISO calendar dates as strings. The NDIA bulk upload requires
// YYYY-MM-DD exactly; lexicographic comparison of valid ISO dates is
// chronological, so no Date objects (and no timezone surprises) are needed.

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// True only for a real calendar date in strict YYYY-MM-DD form
// (2026-02-30 and 2026-13-01 are rejected, not silently rolled over).
export function isValidIsoDate(raw: string): boolean {
	const match = ISO_RE.exec(raw);
	if (match === null) {
		return false;
	}
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	if (month < 1 || month > 12 || day < 1) {
		return false;
	}
	let maxDay = DAYS_IN_MONTH[month - 1] as number;
	if (month === 2 && isLeapYear(year)) {
		maxDay = 29;
	}
	return day <= maxDay;
}

// Chronological comparison of two VALID ISO dates (callers validate first).
export function isOnOrBefore(a: string, b: string): boolean {
	return a <= b;
}
