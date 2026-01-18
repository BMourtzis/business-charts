import { Order } from "@/domain/order/models/order";
import type { OrderItemVariationVM, OrderItemVM, OrderVM } from "../viewModels/orderVM";
import { OrderItem } from "@/domain/order/models/orderItem";
import { normalizeAttribute, OrderItemVariation } from "@/domain/order/models/orderItemVariation";

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

export function mapOrderItemToVM(item: OrderItem): OrderItemVM {
    return {
        id: item.id,
        name: item.name,
        variations: mapVariationsToVm([...item.variations])
    }
}

function mapVariationsToVm(variations: OrderItemVariation[]): OrderItemVariationVM[] {
    const unmergedVariations = variations.map(mapVariationToVM);
    return mergeVariations(unmergedVariations);
}

function mergeVariations(variations: OrderItemVariationVM[]): OrderItemVariationVM[] {
    const map = new Map<string, OrderItemVariationVM>();

    for( const item of variations) {
        const key = item.normalizedAttributes;

        const existing = map.get(key);

        if (existing) {
            // Merge sizing: add quantities for the same sizes
            for (const [sizeKey, qty] of Object.entries(item.sizing)) {
                existing.sizing[sizeKey] = (existing.sizing[sizeKey] || 0) + qty;
            }
        } else {
            // Make a shallow copy to avoid mutating the original
            map.set(key, { ...item, sizing: { ...item.sizing } });
        }
    }

    return [...map.values()];
}

function mapVariationToVM(variation: OrderItemVariation): OrderItemVariationVM {
    const { size, ...attributes } = variation.attributes;
    return {
        attributes: formatAttributes(attributes),
        sizing: formatSizing(size, variation.quantity),
        price: variation.price,
        normalizedAttributes: normalizeAttribute(attributes)
    }
}

function formatAttributes(attributes: Record<string, string|number>): Record<string, string> {
    return Object.fromEntries(
        Object.entries(attributes).map(([key, value]) => [key, value.toString()])
    );
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