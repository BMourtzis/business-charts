import { OrderType, OrderStatus } from "@/domain/order/orderTypes";
import type { IEntityDTO } from "./type";
import type { VariationSnapshot } from "@/domain/order/models/sku";
import type { AllocationDirection } from "@/domain/order/allocationTypes";

export interface OrderDTO extends IEntityDTO {
    id: string;
    orderNumber: string;
    partnerId: string;
    status: OrderStatus;
    type: OrderType;
    items: OrderLineItemDTO[];
    notes: string;
    allocations: MoneyAllocationDTO[];

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

export interface MoneyAllocationDTO {
    moneyMovementId: string;
    amount: number;
    direction: AllocationDirection;
    allocatedAt: string;
}
