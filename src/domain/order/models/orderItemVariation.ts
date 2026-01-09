export type AttributesRecord = Record<string, string | number>;

export function normalizeAttribute(attributes: AttributesRecord): string {
    return Object.entries(attributes)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${String(v)}`)
        .join("|");
}

export class OrderItemVariation  {
    private readonly _attributes: AttributesRecord;
    readonly quantity: number;
    readonly normalizedAttributes: string;

    constructor(quantity: number, attributes: AttributesRecord) {
        if (quantity <= 0) throw new Error("Quantity must be > 0");
        this._attributes = Object.freeze({...attributes});
        this.quantity = quantity;
        this.normalizedAttributes = normalizeAttribute(attributes);
    }

    get attributes() {
        return this._attributes;
    }
}

export function createEmptyOrderItemVariation(quantity: number) {
    return new OrderItemVariation(quantity, {});
}