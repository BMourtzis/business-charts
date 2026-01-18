import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";
export interface DeleteOrderCommand {
    id: string
}

export class DeleteOrderCommandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: DeleteOrderCommand) {
        await orderRepository.remove(cmd.id);
        this._orderStore.remove(cmd.id);
    }
}