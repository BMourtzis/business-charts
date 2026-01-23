import type { IEntity } from "@/domain/type";
import { type MoneyDirection, type PaymentMethod, type MoneyMovementReason } from "../MoneyMovementTypes";

export class MoneyMovement implements IEntity {
    readonly id: string;
    readonly partnerId: string;
    readonly amount: number;
    readonly method: PaymentMethod;
    readonly direction: MoneyDirection;
    readonly reason: MoneyMovementReason;
    readonly createdDate: Date;

    constructor(
        id: string, 
        partnerId: string, 
        amount: number, 
        method: PaymentMethod, 
        direction: MoneyDirection, 
        reason: MoneyMovementReason,
        date?: Date
    ) {
        if (amount <= 0) {
            throw new Error("Amount must be greater than zero");
        }

        this.id = id;
        this.partnerId = partnerId;
        this.amount = amount;
        this.method = method;
        this.direction = direction;
        this.reason = reason;
        this.createdDate = date || new Date();
    }
}