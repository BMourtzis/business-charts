export type VariationSnapshot = Record<string, string>;

export function calculateDerivedSKU(
    productCode: string, 
    variationSnapshot: VariationSnapshot = {}
): string {
    const keys = Object.keys(variationSnapshot);

    if(keys.length === 0) return productCode;

    const variationPart = keys.sort()
        .map(k => formatVariationValue(k, variationSnapshot[k]))
        .join("-");

    return `${productCode}-${variationPart}`;
}

function formatVariationValue(key: string, value: string | boolean) {
    if(typeof value === 'boolean') {
        return key.toLowerCase().replace(/\s+/g, "-");
    }

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