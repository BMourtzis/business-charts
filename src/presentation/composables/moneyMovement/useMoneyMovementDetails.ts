import { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";

export function getPaymentMethodString(method: PaymentMethod, tCap: (key: string, count?: number) => string): string {
    switch(method) {
        case PaymentMethod.Card:
            return tCap("moneyMovement.card");
        case PaymentMethod.Bank:
            return tCap("moneyMovement.bank");
        case PaymentMethod.Cash:
            return tCap("moneyMovement.cash");
        case PaymentMethod.Online:
            return tCap("moneyMovement.online");
        case PaymentMethod.Cheque:
            return tCap("moneyMovement.cheque");
    }
}

export function getPaymentMethodIcon(method: PaymentMethod): string {
    switch(method) {
        case PaymentMethod.Card:
            return "mdi-credit-card";
        case PaymentMethod.Bank:
            return "mdi-bank";
        case PaymentMethod.Cash:
            return "mdi-cash";
        case PaymentMethod.Online:
            return "mdi-web";
        case PaymentMethod.Cheque:
            return "mdi-checkbook";
    }
}

export function getMoneyDirectionString(direction: MoneyDirection, tCap: (key: string, count?: number) => string): string {
    switch(direction) {
        case MoneyDirection.In:
            return tCap("moneyMovement.in");
        case MoneyDirection.Out:
            return tCap("moneyMovement.out");
    }
}

export function getMoneyDirectionIcon(direction: MoneyDirection): string {
    switch(direction) {
        case MoneyDirection.In:
            return "mdi-import";
        case MoneyDirection.Out:
            return "mdi-export";
    }
}

export function getMoneyDirectionColour(direction: MoneyDirection): string {
    switch(direction) {
        case MoneyDirection.In:
            return "green";
        case MoneyDirection.Out:
            return "red";
    }
}

export function getMovementReasonString(
    reason: MoneyMovementReason, 
    tCap: (key: string, count?: number) => string
): string {
    switch(reason) {
        case MoneyMovementReason.CustomerPayment:
            return tCap("moneyMovement.customerPayment");
        case MoneyMovementReason.CustomerRefund:
            return tCap("moneyMovement.customerRefund");
        case MoneyMovementReason.SupplierPayment:
            return tCap("moneyMovement.supplierPayment");
        case MoneyMovementReason.SupplierRefund:
            return tCap("moneyMovement.supplierRefund");
        case MoneyMovementReason.Adjustment:
            return tCap("moneyMovement.adjustment");
    }
}