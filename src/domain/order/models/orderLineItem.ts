import type { Sku } from "./sku";

export class OrderLineItem {
    readonly sku: Sku;
    readonly name: string;
    readonly unitPrice: number;
    readonly quantity: number;

    constructor(sku: Sku, name: string, unitPrice: number, quantity: number) {
        this.sku = sku;
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    withQuantity(qty: number): OrderLineItem {
        return new OrderLineItem(this.sku, this.name, this.unitPrice, qty);
    }

    withUnitPrice(price: number): OrderLineItem {
        return new OrderLineItem(this.sku, this.name, price, this.quantity);
    }

    withName(name: string): OrderLineItem {
        return new OrderLineItem(this.sku, name, this.unitPrice, this.quantity);
    }

    get productCode(): string {
        return this.sku.productCode;
    }
    
    get derivedSKU(): string {
        return this.sku.value;
    }

    get total(): number {
        return this.unitPrice * this.quantity;
    }
}