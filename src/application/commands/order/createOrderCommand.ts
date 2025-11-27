import { OrderItemDTO } from "@/application/dto/orderDTO";
import { fromOrderItemDTO } from "@/application/mapper/orderMapper";
import { createCreditOrder, createDebitOrder, Order } from "@/domain/order/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

function getItems(items?: OrderItemDTO[]) {
    if(items) return items.map(fromOrderItemDTO);
    return [];
}

async function saveOrder(order: Order) {
    await orderRepository.add(order);
    const store = useOrdersStore();
    await store.add(order);
}

//You pay supplier
export async function createDebitOrderCommand(partnerId: string, items?: OrderItemDTO[]) {
    const order = createDebitOrder(partnerId, getItems(items));
``
    await saveOrder(order);

    return order;
}

//customer pays you
export async function createCreditOrderCommand(partnerId: string, items?: OrderItemDTO[]) {
    const order = createCreditOrder(partnerId, getItems(items));

    await saveOrder(order);

    return order;
}