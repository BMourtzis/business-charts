import { v4 as uuidv4 } from "uuid";

import { type IEntity } from "@/domain/type";
import { YearlyClientSequence } from "@/domain/yearlySequence";

import { OrderDirection, OrderStateTransitions, OrderStatus } from "../orderTypes";
import { OrderLineItem } from "./orderLineItem";
import { OrderTimeline } from "./orderTimeline";

export class Order implements IEntity {
    readonly id: string;
    readonly sequence: YearlyClientSequence;
    readonly partnerId: string;
    readonly createdDate: Date;
    readonly direction: OrderDirection;

    private _status: OrderStatus;
    private _items: OrderLineItem[];
    
    private _vatRate: number;
    private _discountAmount: number;
    private _depositAmount: number;

    private _dueDate?: Date;
    private _timeline: OrderTimeline;

    notes: string;

    constructor(
        id: string, 
        sequence: YearlyClientSequence,
        partnerId: string, 
        status: OrderStatus, 
        direction: OrderDirection, 
        vatRate: number, 
        items: OrderLineItem[],
        dueDate?: Date, 
        createdDate?: Date, 
        approvedDate?: Date,
        shippedDate?: Date,
        cancelledDate?: Date,
        completedDate?: Date,
        notes = "",
        discountAmount = 0,
        depositAmount = 0
    ) {
        this.id = id;
        this.sequence = sequence;
        this.partnerId = partnerId;
        
        this._vatRate = vatRate;
        this.notes = notes;
        this._discountAmount = discountAmount;
        this._depositAmount = depositAmount;
        this._status = status;
        this.direction = direction;
        this._items = items.slice();
        
        this._dueDate = dueDate;
        this.createdDate = createdDate ?? new Date();
        this._timeline = new OrderTimeline(
            approvedDate, 
            shippedDate, 
            completedDate, 
            cancelledDate
        );
    }

    get orderNumber() {return this.sequence.format(); }
    get status() { return this._status; }
    get items(): readonly OrderLineItem[] { 
        return this._items; 
    }

    get vatRate() { return this._vatRate; } //TODO: should be .24
    get taxAmount() { return this.subtotal * this._vatRate; }
    get discountAmount() { return this._discountAmount; }
    get depositAmount() { return this._depositAmount; }

    get subtotal() { 
        return this._items.reduce((sum, item) => sum + item.total, 0); 
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount - this.discountAmount;
    }

    get remainingAmount() {
        return this.totalAmount - this._depositAmount;
    }

    get dueDate() { return this._dueDate; }
    get approvedDate() { return this._timeline.approved; }
    get shippedDate() { return this._timeline.shipped; }
    get completedDate() { return this._timeline.completed; }
    get cancelledDate() { return this._timeline.cancelled; }

    //Order items
    setItems(items: OrderLineItem[]) {
        this.assertEdit();

        this._items = items.slice();
    }

    addLine(item: OrderLineItem) {
        this.assertEdit();

        const existingIdx = this.findItemIndex(item.derivedSKU);

        if(existingIdx === -1) {
            this._items.push(item);
        } else {
            const existingItem = this._items[existingIdx];
            this._items[existingIdx] = this.mergeLineItems(existingItem, item);
        }
    }

    private mergeLineItems(existingItem: OrderLineItem, newItem: OrderLineItem): OrderLineItem {
        return new OrderLineItem(
            existingItem.sku,
            newItem.name,
            newItem.unitPrice,
            existingItem.quantity + newItem.quantity
      );
    }

    changeQuantity(derivedSKU: string, quantity: number) {
        this.editItem(derivedSKU, (order) => order.withQuantity(quantity));
    }

    changeUnitPrice(derivedSKU: string, priceNumber: number) {
        this.editItem(derivedSKU, (order) => order.withUnitPrice(priceNumber));
    }

    removeLine(derivedSKU: string) {
        this.assertEdit();
        this._items = this._items.filter(i => i.derivedSKU !== derivedSKU);
    }

    private editItem(derivedSKU: string, getOrderLineItemUpdate: (order: OrderLineItem) => OrderLineItem) {
        this.assertEdit();

        const idx = this.findItemIndex(derivedSKU);
        if (idx === -1) throw new Error(`OrderItem ${derivedSKU} not found`);
        const oldItem = this._items[idx];

        this._items[idx] = getOrderLineItemUpdate(oldItem);
    }

    private findItemIndex(derivedSKU: string): number {
        return this.items.findIndex(i => i.derivedSKU === derivedSKU);
    }

    //Status
    approve() {
        this.assertTransition(OrderStatus.Approved);
        this._status = OrderStatus.Approved;
        this._timeline = this._timeline.withApproved();
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
        this._timeline = this._timeline.withShipped(shippedDate || new Date());
    }

    completed() {
        this.assertTransition(OrderStatus.Completed);
        this._status = OrderStatus.Completed;
        this._timeline = this._timeline.withCompleted();
    }

    cancelled() {
        this.assertTransition(OrderStatus.Cancelled);
        this._status = OrderStatus.Cancelled;
        this._timeline = this._timeline.withCancelled();
    }

    //Asserts
    private assertTransition(newStatus: OrderStatus) {
        if (!this.canTransitionTo(newStatus)) 
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

//You pay supplier
export function createDebitOrder(
    partnerId: string, 
    sequence: YearlyClientSequence, 
    items: OrderLineItem[], 
    vatRate: number, 
    dueDate?: Date
): Order {
    return new Order(
        uuidv4(),
        sequence, 
        partnerId, 
        OrderStatus.Draft, 
        OrderDirection.Debit, 
        vatRate, 
        items, 
        dueDate
    );
}

//customer pays you
export function createCreditOrder(
    partnerId: string, 
    sequence: YearlyClientSequence, 
    items: OrderLineItem[], 
    vatRate: number, 
    dueDate?: Date, 
    notes?: string, 
    discountAmount?: number, 
    depositAmount?: number
): Order {
    return new Order(
        uuidv4(), 
        sequence, 
        partnerId, 
        OrderStatus.Draft, 
        OrderDirection.Credit, 
        vatRate, 
        items, 
        dueDate, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        notes, 
        discountAmount, 
        depositAmount
    );
}