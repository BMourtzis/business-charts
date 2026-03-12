import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import type { Order } from "@/domain/order/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface RefundAllocationCommand {
    orderId: string;
    allocationId: string;
    refundAmount: number;
}

export class RefundAllocationCommandHandler {
    constructor(
        private _orderStore = useOrdersStore(),
    ) {}

    async handle(cmd: RefundAllocationCommand) {
        const order = await this.getOrder(cmd.orderId);
        order.refundAllocation(cmd.allocationId, cmd.refundAmount);

        this.updateOrder(order);
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