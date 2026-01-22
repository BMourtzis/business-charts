import { v4 as uuidv4 } from "uuid";

import { MoneyDirection, MoneyMovementReason, type PaymentMethod } from "../MoneyMovementTypes";
import { MoneyMovement } from "./moneyMovement";

export class MoneyMovementFactory {
    static customerPayment(
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            partnerId,
            amount,
            method,
            MoneyDirection.In,
            MoneyMovementReason.CustomerPayment
        );
    }

    static supplierPayment(
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            partnerId,
            amount,
            method,
            MoneyDirection.Out,
            MoneyMovementReason.SupplierPayment
        );
    }

    static customerRefund(
        partnerId: string,
        amount: number,
        method: PaymentMethod
    ): MoneyMovement {
        return new MoneyMovement(
            uuidv4(),
            partnerId,
            amount,
            method,
            MoneyDirection.Out,
            MoneyMovementReason.CustomerRefund
        );
    }
}