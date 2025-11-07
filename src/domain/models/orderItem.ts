import { v4 as uuidv4 } from "uuid";

export class OrderItem {
    private _id: string;
    // private _productId: string;
    private _quantity: number;
    ///Price without vat
    private _basePrice: number;

    name: string;
    vatRate: number;

    constructor(id: string, name: string, quantity: number, basePrice: number, varRate = 0) {
        this._id = id;
        this.name = name;
        this._quantity = quantity;
        this._basePrice = basePrice;
        this.vatRate = varRate;
    }

    get id() { return this._id; }
    get quantity() { return this._quantity; }
    get basePrice() { return this._basePrice; }
    get unitPrice() { 
        return this.vatRate 
            ? this._basePrice * this.vatRate 
            : this._basePrice; 
    }
    get totalAmount() { 
        return this.unitPrice * this._quantity; 
    }


    updateQuantity(newQuantity: number) {
        this._quantity = newQuantity;
    }

    updateBasePrice(newPrice: number) {
        this._basePrice = newPrice;
    }
    
    updateVatRate(newVatRate: number) {
        this.vatRate = newVatRate;
    }
}

export function createOrderItem(name: string, quantity: number, unitPrice: number, vatRate = 0): OrderItem {
    return new OrderItem(uuidv4(), name, quantity, unitPrice, vatRate);
}