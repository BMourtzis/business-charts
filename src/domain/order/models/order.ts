import { type IEntity } from "@/domain/type";
import { OrderDirection, OrderStateTransitions, OrderStatus } from "../orderTypes";
import { OrderItem } from "./orderItem";
import { v4 as uuidv4 } from "uuid";
import { OrderItemVariation } from "./orderItemVariation";
import { YearlyClientSequence } from "@/domain/yearlySequence";

export class Order implements IEntity {
    private _id: string;
    sequence: YearlyClientSequence;
    private _partnerId: string;
    private _status: OrderStatus;
    private _direction: OrderDirection;
    private _items: OrderItem[];
    
    private _vatRate: number;
    private _discountAmount: number;
    private _depositAmount: number;

    private _createdDate: Date;
    private _dueDate?: Date;
    private _approvedDate?: Date;
    private _cancelledDate?: Date;
    private _shippedDate?: Date;
    private _completedDate?: Date;

    notes: string;

    constructor(
        id: string, 
        sequence: YearlyClientSequence,
        partnerId: string, 
        status: OrderStatus, 
        direction: OrderDirection, 
        vatRate: number, 
        items: OrderItem[],
        dueDate?: Date, 
        createdDate?: Date, 
        approvedDate?: Date,
        cancelledDate?: Date,
        completedDate?: Date,
        notes = "",
        discountAmount = 0,
        depositAmount = 0
    ) {
        this._id = id;
        this.sequence = sequence;
        this._partnerId = partnerId;
        
        this._vatRate = vatRate;
        this.notes = notes;
        this._discountAmount = discountAmount;
        this._depositAmount = depositAmount;
        this._status = status;
        this._direction = direction;
        this._items = items.slice();
        
        this._dueDate = dueDate;
        this._createdDate = createdDate ?? new Date();
        this._approvedDate = approvedDate;
        this._cancelledDate = cancelledDate;
        this._completedDate = completedDate;
    }

    get id() { return this._id; }
    get orderNumber() {return this.sequence.format(); }
    get partnerId() { return this._partnerId; }
    get status() { return this._status; }
    get direction() { return this._direction; }
    get items(): readonly OrderItem[] { 
        return this._items; 
    }

    get vatRate() { return this._vatRate; } //TODO: should be .24
    get taxAmount() { return this.subtotal * this._vatRate; }
    get discountAmount() { return this._discountAmount; }
    get depositAmount() { return this._depositAmount; }

    get subtotal() { 
        return this._items.reduce((sum, item) => sum + item.sumAmount, 0); 
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount - this.discountAmount;
    }

    get remainingAmount() {
        return this.totalAmount - this._depositAmount;
    }

    get dueDate() { return this._dueDate; }
    get createdDate() { return this._createdDate; }
    get approvedDate() { return this._approvedDate; }
    get shippedDate() { return this._shippedDate; }
    get completedDate() { return this._completedDate; }
    get cancelledDate() { return this._cancelledDate; }

    //Order items
    addItem(item: OrderItem) {
        this.assertEdit();

        this._items.push(item);
    }

    setItems(items: OrderItem[]) {
        this.assertEdit();

        this._items = items.slice();
    }

    removeItem(itemId: string) {
        this.assertEdit();

        const index = this._items.findIndex(i => i.id === itemId);
        if(index === -1) return;

        this._items.splice(index, 1);
    }

    
    renameItem(itemId: string, newName: string) {
        this.assertEdit();

        const item = this.findItem(itemId);

        item.rename(newName);
    }

    updateItem(itemId: string, update: OrderItemUpdate) {
        //TODO
    }

    private findItem(itemId: string) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) throw new Error(`OrderItem ${itemId} not found`);
        return item;
    }
    //Status
    approve() {
        this.assertTransition(OrderStatus.Approved);
        this._status = OrderStatus.Approved;
        this._approvedDate = new Date();
    }

    toProcessing() {
        this.assertTransition(OrderStatus.Processing);
        this._status = OrderStatus.Processing;
    }

    readyForShipment() {
        this.assertTransition(OrderStatus.ReadyForShipment);
        this._status = OrderStatus.ReadyForShipment;
    }

    toShipped(shippedDate?: Date) {
        this.assertTransition(OrderStatus.Shipped);
        this._status = OrderStatus.Shipped;
        this._shippedDate = shippedDate || new Date();
    }

    completed() {
        this.assertTransition(OrderStatus.Completed);
        this._status = OrderStatus.Completed;
        this._completedDate = new Date();
    }

    cancelled() {
        this.assertTransition(OrderStatus.Cancelled);
        this._status = OrderStatus.Cancelled;
        this._cancelledDate = new Date();
    }

    private assertTransition(newStatus: OrderStatus) {
        if (this.canTransitionTo(newStatus)) 
            throw new Error(
                `Invalid status transition from '${OrderStatus[this._status]}' to '${OrderStatus[newStatus]}'.`
            );
    }

    private canTransitionTo(newStatus: OrderStatus): boolean {
        return OrderStateTransitions[this._status].includes(newStatus);
    }

    private assertEdit() {
        if(!this.canEditOrder()) {
            throw new Error("Cannot edit order that is not in draft status.");
        }
    }

    private canEditOrder() {
        return this._status === OrderStatus.Draft;
    }
}

export type OrderItemUpdate = {
    name?: string;
    addVariations?: OrderItemVariation[],
    replaceVariations?: OrderItemVariationUpdate[]
    deleteVariations?: string[]
}

export type OrderItemVariationUpdate = {
    key: string;
    variation: OrderItemVariation
}

//You pay supplier
export function createDebitOrder(partnerId: string, sequence: YearlyClientSequence,  items: OrderItem[], vatRate: number, dueDate?: Date): Order {
    return new Order(uuidv4(), sequence, partnerId, OrderStatus.Draft, OrderDirection.Debit, vatRate, items, dueDate);
}

//customer pays you
export function createCreditOrder(partnerId: string, sequence: YearlyClientSequence, items: OrderItem[], vatRate: number, dueDate?: Date, notes?: string, discountAmount?: number, depositAmount?: number): Order {
    return new Order(uuidv4(), sequence, partnerId, OrderStatus.Draft, OrderDirection.Credit, vatRate, items, dueDate, undefined, undefined, undefined, undefined, notes, discountAmount, depositAmount );
}