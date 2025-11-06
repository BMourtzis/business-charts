import { OrderDirection, OrderStatus } from "../types/orderTypes";
import { OrderItem, OrderItemDTO } from "./orderItem";
import { v4 as uuidv4 } from "uuid";

export interface OrderDTO {
    id: string;
    partnerId: string;
    createdDate: Date;
    sentDate?: Date;
    status: OrderStatus;
    directiom: OrderDirection;
    items: OrderItemDTO[];
    totalAmount: number;
}

export class Order {
    private _id: string;
    private _partnerId: string;
    private _createdDate: Date;
    private _sentDate?: Date;
    private _status: OrderStatus;
    private _direction: OrderDirection;
    private _items: OrderItem[];

    constructor(id: string, partnerId: string, direction: OrderDirection, items: OrderItem[]) {
        this._id = id;
        this._partnerId = partnerId;
        this._createdDate = new Date();
        this._status = "draft";
        this._direction = direction;
        this._items = items.slice();
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

    removeItem(itemId: string) {
        if(this.status !== "draft") {
            throw new Error("Cannot add items to an order that is not in draft status.");
        }

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

export function createDebitOrder(id: string, partnerId: string, items: OrderItem[]): Order {
    return new Order(uuidv4(), partnerId, "debit", items);
}

export function createCreditOrder(id: string, partnerId: string, items: OrderItem[]): Order {
    return new Order(uuidv4(), partnerId, "credit", items);
}