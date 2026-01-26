import type { IEntity } from "@/domain/type";
import { type MoneyDirection, type PaymentMethod, type MoneyMovementReason } from "../MoneyMovementTypes";
import type { MovementYearlyClientSequence } from "../movementYearlySequence";

export class MoneyMovement implements IEntity {
    readonly id: string;
    readonly sequence: MovementYearlyClientSequence;
    readonly partnerId: string;
    readonly amount: number;
    readonly method: PaymentMethod;
    readonly direction: MoneyDirection;
    readonly reason: MoneyMovementReason;
    readonly createdDate: Date;

    constructor(
        id: string, 
        sequence: MovementYearlyClientSequence,
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
        this.sequence = sequence;
        this.partnerId = partnerId;
        this.amount = amount;
        this.method = method;
        this.direction = direction;
        this.reason = reason;
        this.createdDate = date || new Date();
    }

    get movementNumber() { return this.sequence.format(); }
}