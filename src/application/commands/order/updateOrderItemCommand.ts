import { createOrderItem } from "@/domain/order/models/orderItem";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export async function addOrderItemCommand(orderId: string, name: string, quantity: number, unitPrice: number, vatRate = 0) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    const orderItem = createOrderItem(name, quantity, unitPrice, vatRate);
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
    quantity?: number, 
    basePrice?: number, 
    vatRate?: number) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    order.updateItem(itemId, {
        name, quantity, basePrice, vatRate
    });

    await orderRepository.update(order);
    await store.update(order);

    return order;
}