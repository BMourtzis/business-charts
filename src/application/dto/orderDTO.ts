import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";
import { IEntityDTO } from "./type";

export interface OrderDTO extends IEntityDTO {
    id: string;
    partnerId: string;
    status: OrderStatus;
    direction: OrderDirection;
    items: OrderItemDTO[];
    notes: string;

    vatRate: number;
    discountAmount: number;
    depositAmount: number

    createdDate: Date;
    dueDate?: Date;
    approvedDate?: Date;
    cancelledDate?: Date;
    shippedDate?: Date;
    completedDate?: Date;
}

export interface OrderItemDTO extends IEntityDTO {
    id: string;
    name: string;
    variations: OrderItemVariationDTO[]
}

type AttributesRecord = Record<string, string | number>;

export interface OrderItemVariationDTO {
    normalizedAttributes: string;
    attributes: AttributesRecord,
    price: number;
    quantity: number;
}
export interface OrderItemVariationUpdateDTO {
    key: string;
    variation: OrderItemVariationDTO
}

export interface OrderItemUpdateDTO {
    itemId? : string;
    name?: string;

    addVariation?: OrderItemVariationDTO[],
    replaceVariations?: OrderItemVariationUpdateDTO[],
    deleteVariations?: string[]
}

