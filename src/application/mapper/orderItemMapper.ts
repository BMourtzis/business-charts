import { OrderItem } from "@/domain/order/models/orderItem";
import type { IMapper } from "./type";
import type { OrderItemDTO } from "../dto/orderDTO";
import { OrderItemVariationMapperInstance } from "./orderItemVariationMapper";

export class OrderItemMapper implements IMapper<OrderItem, OrderItemDTO> {
    toModel(dto: OrderItemDTO): OrderItem {
        return new OrderItem(
            dto.id, 
            dto.name, 
            dto.variations.map(OrderItemVariationMapperInstance.toModel));
    }

    toDTO(model: OrderItem) : OrderItemDTO {
        return {
            id: model.id,
            name: model.name,
            variations: model.variations.map(OrderItemVariationMapperInstance.toDTO)
        };
    }
}

export const OrderItemMapperInstance = new OrderItemMapper();