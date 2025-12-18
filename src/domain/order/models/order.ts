import { IEntity } from "@/domain/type";
import { OrderDirection, OrderStatus } from "../orderTypes";
import { OrderItem } from "./orderItem";
import { v4 as uuidv4 } from "uuid";

export class Order implements IEntity {
    private _id: string;
    private _partnerId: string;
    private _createdDate: Date;
    private _sentDate?: Date;
    private _dueDate?: Date;
    private _status: OrderStatus;
    private _direction: OrderDirection;
    private _items: OrderItem[];

    constructor(id: string, partnerId: string, status: OrderStatus, direction: OrderDirection, items: OrderItem[], dueDate?: Date, createdDate?: Date, sentDate?: Date) {
        this._id = id;
        this._partnerId = partnerId;
        this._createdDate = createdDate ?? new Date();
        this._dueDate = dueDate;
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
    get items(): readonly OrderItem[] { 
        return this._items; 
    }
    get dueDate() { return this._dueDate; }

    get totalAmount() { 
        return this._items.reduce((sum, item) => sum + item.totalAmount, 0); 
    }

    addItem(item: OrderItem) {
        if(this.isDraft()) {
            throw new Error("Cannot add items to an order that is not in draft status.");
        }

        this._items.push(item);
    }

    updateItem(itemId: string, updates: {
        name?: string;
        basePrice?: number;
        vatRate?: number;
    }) {
        if (this.isDraft())
            throw new Error('Only draft orders can be edited');

        const item = this._items.find(i => i.id === itemId);
        if (!item) throw new Error('Item not found');

        if (updates.name) item.name = updates.name;
        if (updates.basePrice !== undefined) item.updateBasePrice(updates.basePrice);
        if (updates.vatRate !== undefined) item.updateVatRate(updates.vatRate);
    }

    setItems(items: OrderItem[]) {
        if(this.isDraft())
            throw new Error("Cannot set items to an order that is not in draft status.");

        this._items = items.slice();
    }

    removeItem(itemId: string) {
        if(this.isDraft())
            throw new Error("Cannot remove items to an order that is not in draft status.");

        const index = this._items.findIndex(i => i.id === itemId);
        if(index === -1) return;

        this._items.splice(index, 1);
    }

    updateStatus(newStatus: OrderStatus) {
        if (newStatus === this._status) return;

        if (this.canTransitionTo(newStatus)) {
            throw new Error(
                `Invalid status transition from '${OrderStatus[this._status]}' to '${OrderStatus[newStatus]}'.`
            );
        }

        this._status = newStatus;

        if(this._status === OrderStatus.Confirmed) {
            this._sentDate = new Date();
        }
    }

    private canTransitionTo(newStatus: OrderStatus): boolean {
        return OrderStateTransitions[this._status].includes(newStatus);
    }

    private isDraft() {
        return this._status === OrderStatus.Draft;
    }
}

const OrderStateTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Draft]: [OrderStatus.Confirmed],
    [OrderStatus.Confirmed]: [OrderStatus.Paid, OrderStatus.Cancelled],
    [OrderStatus.Paid]: [],
    [OrderStatus.Cancelled]: []
};

//You pay supplier
export function createDebitOrder(partnerId: string, items: OrderItem[], dueDate?: Date): Order {
    return new Order(uuidv4(), partnerId, OrderStatus.Draft, OrderDirection.Debit, items, dueDate);
}

//customer pays you
export function createCreditOrder(partnerId: string, items: OrderItem[], dueDate?: Date): Order {
    return new Order(uuidv4(), partnerId, OrderStatus.Draft, OrderDirection.Credit, items, dueDate);
}