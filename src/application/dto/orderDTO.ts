import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";

export interface OrderDTO {
    id: string;
    partnerId: string;
    createdDate: Date;
    sentDate?: Date;
    status: OrderStatus;
    direction: OrderDirection;
    items: OrderItemDTO[];
}

export interface OrderItemDTO {
    id: string;
    name: string;
    quantity: number;
    basePrice: number;
    vatRate: number;
}