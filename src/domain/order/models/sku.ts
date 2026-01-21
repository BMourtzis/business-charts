export type VariationSnapshot = Record<string, string>;

export function calculateDerivedSKU(
    productCode: string, 
    variationSnapshot: VariationSnapshot = {}
): string {
    const keys = Object.keys(variationSnapshot);

    if(keys.length === 0) return productCode;

    const variationPart = keys.sort()
        .map(k => variationSnapshot[k].toLowerCase().replace(/\s+/g, "-"))
        .join("-");

    return `${productCode}-${variationPart}`;
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