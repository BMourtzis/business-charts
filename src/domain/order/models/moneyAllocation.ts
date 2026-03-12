import { v4 as uuidv4 } from "uuid";

import { AllocationDirection } from "../allocationTypes";

export class MoneyAllocation {
    readonly id: string;
    readonly moneyMovementId: string;
    readonly amount: number;
    readonly direction: AllocationDirection;
    readonly allocatedAt: Date;
    readonly refundFor?: string;

    constructor(
        allocationId: string,
        moneyMovementId: string,
        amount: number,
        direction: AllocationDirection,
        refundFor?: string,
        allocatedAt?: Date
    ) {
        if (amount <= 0) {
            throw new Error("Allocation amount must be greater than zero");
        }

        this.id = allocationId;
        this.moneyMovementId = moneyMovementId;
        this.amount = amount;
        this.direction = direction;
        this.allocatedAt = allocatedAt ?? new Date();
        this.refundFor = refundFor;
    }

    static createAllocation(
        moneyMovementId: string,
        amount: number,
        direction: AllocationDirection,
        allocatedAt?: Date
    ) {
        return new MoneyAllocation(
            uuidv4(),
            moneyMovementId,
            amount,
            direction,
            undefined,
            allocatedAt
        );
    }

    static refundAllocation(allocation: MoneyAllocation, amount: number): MoneyAllocation {
        return new MoneyAllocation(
            uuidv4(),
            allocation.moneyMovementId,
            amount,
            allocation.direction === AllocationDirection.Apply
                ? AllocationDirection.Reverse
                : AllocationDirection.Apply,
            allocation.id
        );
    }

    get effectiveAmount(): number {
        return this.direction === AllocationDirection.Apply
            ? this.amount
            : -this.amount;
    }
}