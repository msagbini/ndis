// All money is integer cents. Floating-point dollars never enter the engine:
// 0.1 + 0.2 !== 0.3, and rounding errors in claims are real dollars.

const MONEY_RE = /^\d{1,10}(\.\d{1,2})?$/;

// Parses a decimal dollar string ("12.34") into integer cents.
// Returns null for anything that is not a plain non-negative decimal with at
// most 2 decimal places — no signs, separators, currency symbols or exponents.
export function parseMoneyToCents(raw: string): number | null {
	if (!MONEY_RE.test(raw)) {
		return null;
	}
	const parts = raw.split(".");
	const whole = parts[0] as string;
	const fracPadded = (parts[1] ?? "").padEnd(2, "0");
	return Number(whole) * 100 + Number(fracPadded);
}

export function formatCentsAsDollars(cents: number): string {
	const whole = Math.trunc(cents / 100);
	const frac = Math.abs(cents % 100);
	return `${whole}.${String(frac).padStart(2, "0")}`;
}

// True for a quantity the engine accepts: positive, finite, below a sane cap,
// at most 4 decimal places (hours like 1.25 or 2.0001 are fine).
// The epsilon absorbs binary float representation noise (2.0001 * 10000 is
// 20001.000000000004 in IEEE-754) without letting a real 5th decimal through:
// a genuine extra decimal is off by at least 0.1 ten-thousandths.
export function isValidQuantity(quantity: number): boolean {
	if (!Number.isFinite(quantity) || quantity <= 0 || quantity >= 100000) {
		return false;
	}
	const scaled = quantity * 10000;
	return Math.abs(scaled - Math.round(scaled)) < 1e-6;
}

// Line total in integer cents: quantity (≤4 dp) × unit price (integer cents).
// Scaling quantity to an integer first keeps the arithmetic exact.
export function lineTotalCents(
	quantity: number,
	unitPriceCents: number,
): number {
	const quantityTenThousandths = Math.round(quantity * 10000);
	return Math.round((quantityTenThousandths * unitPriceCents) / 10000);
}
