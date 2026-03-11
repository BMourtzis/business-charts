import type { OrderLineItemDTO } from "@/application/dto/orderDTO";
import { OrderItemMapperInstance } from "@/application/mapper/orderItemMapper";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface EditOrderItemsCommand {
    orderId: string;
    vatRate?: number;
    items: OrderLineItemDTO[];
}

export class EditOrderItemsCommandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: EditOrderItemsCommand) {
        const order = await orderRepository.getById(cmd.orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        if(cmd.vatRate) {
            order.updateVatRate(cmd.vatRate);
        }

        const items = cmd.items.map(OrderItemMapperInstance.toModel);

        order.syncLines(items);

        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}