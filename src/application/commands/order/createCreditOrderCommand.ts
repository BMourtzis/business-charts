import { OrderItemVariationDTO } from "@/application/dto/orderDTO";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { createCreditOrder } from "@/domain/order/models/order";
import { createOrderItem } from "@/domain/order/models/orderItem";
import { OrderItemVariation } from "@/domain/order/models/orderItemVariation";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface CreateCreditOrderCommand {
    partnerId: string;
    vatRate: number;
    dueDate?: Date;
    notes: string;
    depositAmount: number;
    discountAmount: number;
    items: CreateOrderDTO[];
};

export interface CreateOrderDTO {
    name: string;
    variations: OrderItemVariationDTO[];
}

export class CreateCreditOrderCommmandHandler {
    constructor(private _orderStore = useOrdersStore()) {}

    async handle(cmd: CreateCreditOrderCommand) {
        console.log(cmd);
        const items = cmd.items.map(itemDto =>
            createOrderItem(
                itemDto.name,
                itemDto.variations.map(v => new OrderItemVariation(v.quantity, v.price, v.attributes))
            )
        );

        const order = createCreditOrder(
            cmd.partnerId,
            items,
            cmd.vatRate,
            cmd.dueDate,
            cmd.notes,
            cmd.discountAmount,
            cmd.depositAmount
        );

        console.log(order);

        await orderRepository.add(order);
        this._orderStore.add(OrderMapperInstance.toDTO(order));
    }
}