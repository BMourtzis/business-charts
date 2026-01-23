import type { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
import type { IEntityDTO } from "./type";

export interface MoneyMovementDTO extends IEntityDTO {
    id: string;
    partnerId: string;
    amount: number;
    method: PaymentMethod;
    direction: MoneyDirection;
    reason: MoneyMovementReason;
    createdDate: Date;
}