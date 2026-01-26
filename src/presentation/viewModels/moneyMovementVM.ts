import type { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";

export type MoneyMovementEditVM = {
    partnerId: string | null;
    amount: number | null;
    method: PaymentMethod | null;
    reason: MoneyMovementReason | null;
}