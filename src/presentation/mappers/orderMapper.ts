import { Order } from "@/domain/order/models/order";
import type { OrderLineItemVM, OrderVM } from "../viewModels/orderVM";
import type { OrderLineItem } from "@/domain/order/models/orderLineItem";
import { calculateDerivedSKU } from "@/domain/order/models/sku";

export function mapOrderToVM(order: Order): OrderVM {
  return {
    id: order.id,
    partnerId: order.partnerId,
    status: order.status,
    type: order.type,
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

export function mapOrderLineItemsToVM(items: OrderLineItem[]): OrderLineItemVM[] {
    const unmergedLineItems = items.map(mapOrderItemToVM);
    return mergeLineItems(unmergedLineItems);
}

function mapOrderItemToVM(item: OrderLineItem): OrderLineItemVM {
    const attributes = item.sku.variationSnapshot.attributes ?? {};
    const { size, ...restAttributes } = attributes;

    return {
        name: item.name,
        unitPrice: item.unitPrice,
        productCode: item.productCode,
        derivedSku: calculateDerivedSKU(
            item.productCode,
            {
                attributes: restAttributes,
                flags: item.sku.variationSnapshot.flags
            }
        ),
        variationSnapshot: {
            attributes: restAttributes,
            flags: item.sku.variationSnapshot.flags
        },
        sizing: formatSizing(size, item.quantity)
    };
}

function mergeLineItems(items: OrderLineItemVM[]): OrderLineItemVM[] {
    const map = new Map<string, OrderLineItemVM>();

    for( const item of items) {
        const key = item.derivedSku;

        const existing = map.get(key);

        if (existing) {
            for (const [sizeKey, qty] of Object.entries(item.sizing)) {
                existing.sizing[sizeKey] = (existing.sizing[sizeKey] || 0) + qty;
            }
        } else {
            map.set(key, { ...item, sizing: { ...item.sizing } });
        }
    }

    return [...map.values()];
}

function formatSizing(size: string | number, quantity: number): Record<string, number> {
    return {
        [`shoe:${size}`]: quantity
    };
}

function getDate(date: Date): string {
    return date.toISOString();
}

function getDateOrUndefined(date?: Date): string | undefined {
    if(date) return getDate(date);

    return undefined;
}