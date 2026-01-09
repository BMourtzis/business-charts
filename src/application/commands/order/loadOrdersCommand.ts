import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export async function loadOrders() {
    const order = await orderRepository.load();
    const store = useOrdersStore();
    store.setOrders(order);
}