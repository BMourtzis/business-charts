import { Order } from "@/domain/order/models/order";
import type { OrderItemVariationVM, OrderItemVM, OrderVM } from "../viewModels/orderVM";
import { OrderItem } from "@/domain/order/models/orderItem";
import { OrderItemVariation } from "@/domain/order/models/orderItemVariation";

export function mapOrderToVM(order: Order): OrderVM {
  return {
    id: order.id,
    partnerId: order.partnerId,
    status: order.status,
    direction: order.direction,
    subtotal: order.subtotal,
    taxAmount: order.taxAmount,
    discountAmount: order.discountAmount,
    totalAmount: order.totalAmount,
    createdDate: getDate(order.createdDate),
    dueDate: getDateOrUndefined(order.dueDate),
    approvedDate: getDateOrUndefined(order.approvedDate),
    cancelledDate: getDateOrUndefined(order.cancelledDate),
    shippedDate: getDateOrUndefined(order.shippedDate),
    completedDate: getDateOrUndefined(order.completedDate),
    notes: order.notes,
    items: order.items.map(mapOrderItemToVM)
  };
}

function mapOrderItemToVM(item: OrderItem): OrderItemVM {
    return {
        id: item.id,
        name: item.name,
        variations: item.variations.map(mapVariationsToVM)
    }
}

function mapVariationsToVM(variation: OrderItemVariation): OrderItemVariationVM {
    return {
        attributes: {},
        sizing: {},
        price: variation.price
    }
}

function getDate(date: Date): string {
    return date.toISOString();
}

function getDateOrUndefined(date?: Date): string | undefined {
    if(date) return getDate(date);

    return undefined;
}