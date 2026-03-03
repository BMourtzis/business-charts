import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";
export interface DeleteOrderCommand {
    id: string
}

export class DeleteOrderCommandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: DeleteOrderCommand) {
        const order = await orderRepository.getById(cmd.id);

        if(!order) return;

        if(order.netAllocatedAmount > 0) {
            throw Error("Cannot delete an order with an allocated amount larger than zero.");
        }

        await orderRepository.remove(cmd.id);
        this._orderStore.remove(cmd.id);
    }
}