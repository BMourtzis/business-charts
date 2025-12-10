import { IEntity } from "@/domain/type";
import { OrderDirection, OrderStatus } from "../orderTypes";
import { OrderItem } from "./orderItem";
import { v4 as uuidv4 } from "uuid";

export class Order implements IEntity {
    private _id: string;
    private _partnerId: string;
    private _createdDate: Date;
    private _sentDate?: Date;
    private _status: OrderStatus;
    private _direction: OrderDirection;
    private _items: OrderItem[];

    constructor(id: string, partnerId: string, status: OrderStatus, direction: OrderDirection, items: OrderItem[], createdDate?: Date, sentDate?: Date) {
        this._id = id;
        this._partnerId = partnerId;
        this._createdDate = createdDate ?? new Date();
        this._status = status;
        this._direction = direction;
        this._items = items.slice();
        
        if(sentDate) {
            this._sentDate = sentDate;
        }
    }

    get id() { return this._id; }
    get partnerId() { return this._partnerId; }
    get createdDate() { return this._createdDate; }
    get sentDate() { return this._sentDate; }
    get status() { return this._status; }
    get direction() { return this._direction; }
    get items() { return this._items.slice(); }

    get totalAmount() { 
        return this._items.reduce((sum, item) => sum + item.totalAmount, 0); 
    }

    addItem(item: OrderItem) {
        if(this.status !== "draft") {
            throw new Error("Cannot add items to an order that is not in draft status.");
        }

        this._items.push(item);
    }

    updateItem(itemId: string, updates: {
        name?: string;
        quantity?: number;
        basePrice?: number;
        vatRate?: number;
    }) {
        if (this._status !== 'draft')
            throw new Error('Only draft orders can be edited');

        const item = this._items.find(i => i.id === itemId);
        if (!item) throw new Error('Item not found');

        if (updates.name) item.name = updates.name;
        if (updates.quantity !== undefined) item.updateQuantity(updates.quantity);
        if (updates.basePrice !== undefined) item.updateBasePrice(updates.basePrice);
        if (updates.vatRate !== undefined) item.updateVatRate(updates.vatRate);
    }

    setItems(items: OrderItem[]) {
        if(this.status !== "draft")
            throw new Error("Cannot set items to an order that is not in draft status.");

        this._items = items.slice();
    }

    removeItem(itemId: string) {
        if(this.status !== "draft")
            throw new Error("Cannot remove items to an order that is not in draft status.");

        const index = this._items.findIndex(i => i.id === itemId);
        if(index === -1) return;

        this._items.splice(index, 1);
    }

    updateStatus(newStatus: OrderStatus) {
        if (newStatus === this._status) return;

        switch (this._status) {
            case "draft":
                if (newStatus !== "confirmed") {
                    throw new Error(`Invalid status transition from '${this._status}' to '${newStatus}'. Allowed: 'confirmed'.`);
                }
                break;
            case "confirmed":
                if (newStatus !== "paid" && newStatus !== "cancelled") {
                    throw new Error(`Invalid status transition from '${this._status}' to '${newStatus}'. Allowed: 'paid' or 'cancelled'.`);
                }
                break;
            case "paid":
            case "cancelled":
                throw new Error(`Cannot change status once it is '${this._status}'.`);
        }

        this._status = newStatus;
    }
}

//You pay supplier
export function createDebitOrder(partnerId: string, items: OrderItem[]): Order {
    return new Order(uuidv4(), partnerId, "draft", "debit", items);
}

//customer pays you
export function createCreditOrder(partnerId: string, items: OrderItem[]): Order {
    return new Order(uuidv4(), partnerId, "draft", "credit", items);
}