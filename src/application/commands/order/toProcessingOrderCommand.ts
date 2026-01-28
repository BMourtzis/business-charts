import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import type { Order } from "@/domain/order/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface ToProcessingOrderCommand {
    orderId: string;
}

export class ToProcessingOrderCommandHandler {
    constructor(private _orderStore = useOrdersStore())  {}

    async handle(cmd: ToProcessingOrderCommand) {
        const order = await this.getOrder(cmd.orderId);
        order.toProcessing();

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