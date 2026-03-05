import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface EditOrderCommand {
    orderId: string;
    dueDate?: Date;
    notes?: string;
}

export class EditOrderCommandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: EditOrderCommand) {
        const order = await orderRepository.getById(cmd.orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        if(cmd.notes) {
            order.updateNotes(cmd.notes);
        }

        if(cmd.dueDate) {
            order.updateDueDate(cmd.dueDate);
        }

        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}