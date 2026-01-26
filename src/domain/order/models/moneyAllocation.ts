import { AllocationDirection } from "../allocationTypes";

export class MoneyAllocation {
    readonly moneyMovementId: string;
    readonly amount: number;
    readonly direction: AllocationDirection;
    readonly allocatedAt: Date;

    constructor(
        moneyMovementId: string,
        amount: number,
        direction: AllocationDirection,
        allocatedAt?: Date
    ) {
        if (amount <= 0) {
            throw new Error("Allocation amount must be greater than zero");
        }

        this.moneyMovementId = moneyMovementId;
        this.amount = amount;
        this.direction = direction;
        this.allocatedAt = allocatedAt ?? new Date();
    }

    get effectiveAmount(): number {
        return this.direction === AllocationDirection.Apply
            ? this.amount
            : -this.amount;
    }
}