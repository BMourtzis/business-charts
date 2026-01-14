export type AttributesRecord = Record<string, string | number>;

export function normalizeAttribute(attributes: AttributesRecord): string {
    return Object.entries(attributes)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${String(v)}`)
        .join("|");
}

export class OrderItemVariation  {
    readonly attributes: AttributesRecord;
    readonly normalizedAttributes: string;
    readonly quantity: number;
    readonly price: number;

    constructor(quantity: number, price: number, attributes: AttributesRecord) {
        if (quantity <= 0) throw new Error("Quantity must be > 0");
        this.attributes = Object.freeze({...attributes});
        this.normalizedAttributes = normalizeAttribute(attributes);
        this.quantity = quantity;
        this.price = price
    }

    get sum() {
        return this.price * this.quantity;
    }
}

export function createEmptyOrderItemVariation(quantity: number, price: number) {
    return new OrderItemVariation(quantity, price, {});
}