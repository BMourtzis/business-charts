import { createCreditOrder, createDebitOrder, Order } from "@/domain/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

async function saveOrder(order: Order) {
    await orderRepository.add(order);
    const store = useOrdersStore();
    await store.add(order);
}

//You pay supplier
export async function createDebitOrderCommand(partnerId: string) {
    const order = createDebitOrder(partnerId, []);

    await saveOrder(order);

    return order;
}

//customer pays you
export async function createCreditOrderCommand(partnerId: string) {
    const order = createCreditOrder(partnerId, []);

    await saveOrder(order);

    return order;
}