export type VariationSnapshot = {
    attributes?: Record<string, string>;
    flags?: Record<string, true>;
}

export function calculateDerivedSKU(
    productCode: string,
    snapshot: VariationSnapshot = {}
): string {
    const parts = [
        ...Object.values(snapshot.attributes ?? {}),
        ...Object.keys(snapshot.flags ?? {})
    ]
    .map(normalize)
    .sort();

    return parts.length
        ? `${productCode}-${parts.join("-")}`
        : productCode;
}

function normalize(value: string) {
    return value.toLowerCase().replace(/\s+/g, "-");
}

function valuesExcept(
  record: Record<string, string> | undefined,
  excludedKeys: readonly string[]
): string[] {
  if (!record) return []

  return Object.entries(record)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([, value]) => value);
}

function keysExcept(
  record: Record<string, true> | undefined,
  excludedKeys: readonly string[]
): string[] {
  if (!record) return []

  return Object.entries(record)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([key, ]) => key);
}

export class Sku {
    readonly productCode: string;
    readonly variationSnapshot: VariationSnapshot;

    constructor(productCode: string, variationSnapshot?: VariationSnapshot) {
        this.productCode = productCode;
        this.variationSnapshot = variationSnapshot ?? {};
    }

    get value() { return calculateDerivedSKU(this.productCode, this.variationSnapshot); }
    get size() { return this.variationSnapshot.attributes?.["size"] || ""; }

    getSnapshotValues(excludeKeys: readonly string[]) {
        const attributeValues = valuesExcept(this.variationSnapshot.attributes, excludeKeys);
        const flagValues = keysExcept(this.variationSnapshot.flags, excludeKeys);
        return [...attributeValues, ...flagValues];
    }
}