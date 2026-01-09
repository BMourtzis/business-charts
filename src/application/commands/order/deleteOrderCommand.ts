import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export async function deleteOrderComand(id: string) {
    const store = useOrdersStore();

    await orderRepository.remove(id);
    await store.remove(id);
}