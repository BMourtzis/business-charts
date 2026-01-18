import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";

export interface OrderVM {
    id: string;
    partnerId: string;
    status: OrderStatus;
    direction: OrderDirection;
    totalAmount: number;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    createdDate?: string;
    dueDate?: string;
    approvedDate?: string;
    cancelledDate?: string;
    shippedDate?: string;
    completedDate?: string;
    notes: string;
    items: OrderItemVM[];
}

export interface OrderItemVM {
    id: string;
    name: string;
    variations: OrderItemVariationVM[]
}

export interface OrderItemVariationVM {
    attributes: Record<string, string>,
    sizing: Record<string, number>,
    price: number
}

