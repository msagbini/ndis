import type { CatalogueVersion, SupportItem } from "./types.js";

// Returns the catalogue version whose validity window contains the date, or
// null. Versions are expected not to overlap; if data ever violates that,
// the earliest matching version wins deterministically.
export function findCatalogueVersion(
	versions: CatalogueVersion[],
	isoDate: string,
): CatalogueVersion | null {
	for (const version of versions) {
		if (version.effectiveFrom <= isoDate && isoDate <= version.effectiveTo) {
			return version;
		}
	}
	return null;
}

export function findSupportItem(
	version: CatalogueVersion,
	supportItemNumber: string,
): SupportItem | null {
	for (const item of version.items) {
		if (item.supportItemNumber === supportItemNumber) {
			return item;
		}
	}
	return null;
}
