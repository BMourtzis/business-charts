import type { OrderLineItemDTO } from "@/application/dto/orderDTO";
import { OrderItemMapperInstance } from "@/application/mapper/orderItemMapper";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { Order } from "@/domain/order/models/order";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { OrderNumberService } from "@/infrastructure/services/orderNumberService";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface CreateCreditOrderCommand {
    partnerId: string;
    vatRate: number;
    dueDate?: Date;
    notes: string;
    depositAmount: number;
    discountAmount: number;
    items: OrderLineItemDTO[];
};

export class CreateCreditOrderCommmandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: CreateCreditOrderCommand) {
        const items = cmd.items.map(OrderItemMapperInstance.toModel);

        const sequence = await OrderNumberService.getNext(cmd.partnerId);

        const order = Order.createIncomingOrder(
            cmd.partnerId,
            sequence,
            items,
            cmd.vatRate,
            cmd.dueDate,
            cmd.notes,
            cmd.discountAmount,
            cmd.depositAmount
        );

        await orderRepository.add(order);
        this._orderStore.add(OrderMapperInstance.toDTO(order));
    }
}