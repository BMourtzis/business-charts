import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import type { Order } from "@/domain/order/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface CancelOrderCommand {
    orderId: string;
}

//TODO: maybe add a cancellation reason in the future
//TODO: ask stefania if there is a partial cancellation?
export class CancelOrderCommandHandler {
    constructor(private _orderStore = useOrdersStore())  {}

    async handle(cmd: CancelOrderCommand) {
        const order = await this.getOrder(cmd.orderId);
        order.cancelOrder();

        await this.updateOrder(order);
    }

    private async getOrder(orderId: string): Promise<Order> {
        const order = await orderRepository.getById(orderId);

        if(!order) throw new Error(`Order with id ${orderId} not found`);

        return order;
    }

    private async updateOrder(order: Order): Promise<void> {
        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}