import { v4 as uuidv4 } from "uuid";
import { PaymentDirection, PaymentMethod } from "../paymentTypes";

export interface PaymentDTO {
    id: string;
    partnerId: string;
    amount: number;
    method: PaymentMethod;
    direction: PaymentDirection;
    date: Date;
}

export class Payment {
    private _id: string;
    private _partnerId: string;
    private _amount: number;
    private _method: PaymentMethod;
    private _direction: PaymentDirection;
    private _date: Date;

    constructor(id: string, partnerId: string, amount: number, method: PaymentMethod, direction: PaymentDirection, date?: Date) {
        this._id = id;
        this._partnerId = partnerId;
        this._amount = amount;
        this._method = method;
        this._direction = direction;
        this._date = date ? date : new Date();
    }

    get id() { return this._id; }
    get partnerId() { return this._partnerId; }
    get amount() { return this._amount; }
    get method() { return this._method; }
    get direction() { return this._direction; }
    get date() { return this._date; }
}

export function createDebitPayment(id: string, partnerId: string, amount: number, method: PaymentMethod, date?: Date): Payment {
    return new Payment(uuidv4(), partnerId, amount, method, "debit", date);
}

export function createCreditPayment(id: string, partnerId: string, amount: number, method: PaymentMethod, date?: Date): Payment {
    return new Payment(uuidv4(), partnerId, amount, method, "credit", date);
}