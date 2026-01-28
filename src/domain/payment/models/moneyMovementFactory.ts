import { v4 as uuidv4 } from "uuid";

import { MoneyDirection, MoneyMovementReason, type PaymentMethod } from "../MoneyMovementTypes";
import { MoneyMovement } from "./moneyMovement";
import type { MovementYearlyClientSequence } from "../movementYearlySequence";
import type { Order } from "@/domain/order/models/order";
import { OrderType } from "@/domain/order/orderTypes";

export class MoneyMovementFactory {
    static createPaymentFromOrder(
        orderType: OrderType,
        partnerId: string,
        sequence: MovementYearlyClientSequence,
        amount: number,
        method: PaymentMethod
    ) {
        if(orderType === OrderType.Sales) {
            return this.customerPayment(sequence, partnerId, amount, method);
        } else {
            return this.supplierPayment(sequence, partnerId, amount, method);
        }
    }

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