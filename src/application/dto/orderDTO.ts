import { OrderType, OrderStatus } from "@/domain/order/orderTypes";
import type { IEntityDTO } from "./type";
import type { VariationSnapshot } from "@/domain/order/models/sku";

export interface OrderDTO extends IEntityDTO {
    id: string;
    orderNumber: string;
    partnerId: string;
    status: OrderStatus;
    type: OrderType;
    items: OrderLineItemDTO[];
    notes: string;

    vatRate: number;
    discountAmount: number;
    depositAmount: number

    createdDate: string;
    dueDate?: string;
    approvedDate?: string;
    cancelledDate?: string;
    shippedDate?: string;
    completedDate?: string;
}

export interface OrderLineItemDTO {
    name?: string;
    derivedSku: string;
    quantity: number;
    unitPrice: number;
    productCode: string;
    variationSnapshot: VariationSnapshot;
}
