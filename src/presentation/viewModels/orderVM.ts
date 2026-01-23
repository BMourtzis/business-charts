import type { VariationSnapshot } from "@/domain/order/models/sku";
import { OrderType, OrderStatus } from "@/domain/order/orderTypes";

export interface OrderVM {
    id: string;
    partnerId: string;
    status: OrderStatus;
    type: OrderType;
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
    items: OrderLineItemVM[];
}

export type OrderEditVM = {
    type: 'Sales' | "Purchase",
    partnerId: string,
    vatRate: number,
    dueDate: Date | null,
    notes: string,
    depositAmount: number,
    discountAmount: number,
    items: OrderLineItemVM[]
}

export interface OrderLineItemVM {
    name?: string;
    unitPrice: number;
    productCode: string;
    derivedSku: string;
    variationSnapshot: VariationSnapshot;
    sizing: Record<string, number>,
}

