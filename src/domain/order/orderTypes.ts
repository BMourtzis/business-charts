export enum OrderStatus {
    Draft = "Draft",
    Cancelled = "Cancelled",
    Approved = "Approved",
    Processing = "Processing",
    ReadyForShipment = "ReadyForShipment",
    Shipped = "Shipped",
    Completed = "Completed"
}

export const OrderStateTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Draft]: [OrderStatus.Approved, OrderStatus.Cancelled],
    [OrderStatus.Approved]: [OrderStatus.Processing, OrderStatus.ReadyForShipment, OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.ReadyForShipment, OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.ReadyForShipment]: [OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Shipped]: [OrderStatus.Completed, OrderStatus.Cancelled],
    [OrderStatus.Completed]: [],
    [OrderStatus.Cancelled]: []
};

export enum OrderDirection {
    Credit = "Credit",
    Debit = "Debit"
}