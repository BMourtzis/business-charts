import { createOrderItem } from "@/domain/order/models/orderItem";
import { OrderItemVariation } from "@/domain/order/models/orderItemVariation";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export async function addOrderItemCommand(orderId: string, name: string, unitPrice: number, vatRate: number, variations: OrderItemVariation[]) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    const orderItem = createOrderItem(name, unitPrice, vatRate, variations);
    order.addItem(orderItem);

    await orderRepository.update(order);
    await store.update(order);

    return order;
}

export async function removeOrderItemCommand(orderId: string, itemId: string) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    order.removeItem(itemId);

    await orderRepository.update(order);
    await store.update(order);

    return order;
}

export async function updateOrderItemCommand(
    orderId: string, 
    itemId: string, 
    name?: string, 
    basePrice?: number, 
    vatRate?: number) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    order.updateItem(itemId, {
        name, basePrice, vatRate
    });

    await orderRepository.update(order);
    await store.update(order);

    return order;
}