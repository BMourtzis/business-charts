export enum PaymentMethod {
    Card = "Card",
    Bank = "Bank",
    Cash = "Cash",
    Online = "Online",
    Cheque = "Cheque"
}

export enum MoneyDirection {
    In = "In",
    Out = "Out"
};

export enum MoneyMovementReason {
    CustomerPayment = "CustomerPayment",
    CustomerRefund = "CustomerRefund",
    SupplierPayment = "SupplierPayment",
    SupplierRefund = "SupplierRefund",
    Adjustment = "Adjustment"
}