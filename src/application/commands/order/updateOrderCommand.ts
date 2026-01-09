
import { OrderStatus } from "@/domain/order/orderTypes";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export async function updateOrderStatusCommand(orderId: string, newStatus: OrderStatus) {
    const store = useOrdersStore();
    const order = store.getOrderById(orderId);
    if(!order) return;

    order.updateStatus(newStatus);

    await orderRepository.update(order);
    await store.update(order);

    return order;
}