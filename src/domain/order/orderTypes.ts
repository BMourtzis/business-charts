export enum OrderStatus {
    Draft = "Draft",
    Cancelled = "Cancelled",
    Approved = "Approved",
    Processing = "Processing",
    ReadyForShipment = "ReadyForShipment",
    Shipped = "Shipped",
    Completed = "Completed"
}

export const statusHierarchy: Record<OrderStatus, number> = {
    [OrderStatus.Draft]: 1,
    [OrderStatus.Approved]: 2,
    [OrderStatus.Processing]: 3,
    [OrderStatus.ReadyForShipment]: 4,
    [OrderStatus.Shipped]: 5,
    [OrderStatus.Cancelled]: 6,
    [OrderStatus.Completed]: 7,
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

export enum OrderType {
    Sales = "Sales",
    Purchase = "Purchase"
}