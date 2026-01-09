import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";
import { IEntityDTO } from "./type";

export interface OrderDTO extends IEntityDTO {
    id: string;
    partnerId: string;
    createdDate: Date;
    sentDate?: Date;
    dueDate?: Date;
    status: OrderStatus;
    direction: OrderDirection;
    vatRate: number;
    items: OrderItemDTO[];
}

export interface OrderItemDTO extends IEntityDTO {
    id: string;
    name: string;
    basePrice: number;
    variations: OrderItemVariationDTO[]
}

type AttributesRecord = Record<string, string | number>;

export interface OrderItemVariationDTO {
    attributes: AttributesRecord,
    quantity: number;
}