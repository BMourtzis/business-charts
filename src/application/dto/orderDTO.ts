import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";
import { IEntityDTO } from "./type";

export interface OrderDTO extends IEntityDTO {
    id: string;
    partnerId: string;
    createdDate: Date;
    sentDate?: Date;
    status: OrderStatus;
    direction: OrderDirection;
    items: OrderItemDTO[];
}

export interface OrderItemDTO extends IEntityDTO {
    id: string;
    name: string;
    quantity: number;
    basePrice: number;
    vatRate: number;
}