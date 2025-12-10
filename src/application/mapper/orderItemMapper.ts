import { OrderItem } from "@/domain/order/models/orderItem";
import { IMapper } from "./type";
import { OrderItemDTO } from "../dto/orderDTO";

export class OrderItemMapper implements IMapper<OrderItem, OrderItemDTO> {
    toModel(dto: OrderItemDTO): OrderItem {
        return new OrderItem(dto.id, dto.name, dto.quantity, dto.basePrice, dto.vatRate);
    }

    toDTO(model: OrderItem) : OrderItemDTO {
        return {
            id: model.id,
            name: model.name,
            quantity: model.quantity,
            basePrice: model.basePrice,
            vatRate: model.vatRate
        };
    }
}

export const OrderItemMapperInstance = new OrderItemMapper();