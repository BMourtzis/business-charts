import { v4 as uuidv4 } from "uuid";

import { MoneyDirection, MoneyMovementReason, type PaymentMethod } from "../MoneyMovementTypes";
import { MoneyMovement } from "./moneyMovement";
import type { MovementYearlyClientSequence } from "../movementYearlySequence";

export class MoneyMovementFactory {
    static customerPayment(
        sequence: MovementYearlyClientSequence,
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            sequence,
            partnerId,
            amount,
            method,
            MoneyDirection.In,
            MoneyMovementReason.CustomerPayment
        );
    }

    static supplierPayment(
        sequence: MovementYearlyClientSequence,
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            sequence,
            partnerId,
            amount,
            method,
            MoneyDirection.Out,
            MoneyMovementReason.SupplierPayment
        );
    }

    static customerRefund(
        sequence: MovementYearlyClientSequence,
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            sequence,
            partnerId,
            amount,
            method,
            MoneyDirection.Out,
            MoneyMovementReason.CustomerRefund
        );
    }
}