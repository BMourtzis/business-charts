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

export class Sku {
    readonly productCode: string;
    readonly variationSnapshot: VariationSnapshot;

    constructor(productCode: string, variationSnapshot?: VariationSnapshot) {
        this.productCode = productCode;
        this.variationSnapshot = variationSnapshot ?? {};
    }

    get value() { return calculateDerivedSKU(this.productCode, this.variationSnapshot);}
}