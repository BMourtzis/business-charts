import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export class LoadOrdersCommandHandler {
    constructor(private _ordersStore = useOrdersStore()) {}

    async handle() {
        const orders = await orderRepository.getAll();
        this._ordersStore.setOrders(orders);
    }
}