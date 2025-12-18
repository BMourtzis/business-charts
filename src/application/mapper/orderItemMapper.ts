import { OrderItem } from "@/domain/order/models/orderItem";
import { IMapper } from "./type";
import { OrderItemDTO } from "../dto/orderDTO";
import { OrderItemVariationMapperInstance } from "./orderItemVariationMapper";

export class OrderItemMapper implements IMapper<OrderItem, OrderItemDTO> {
    toModel(dto: OrderItemDTO): OrderItem {
        return new OrderItem(
            dto.id, 
            dto.name, 
            dto.basePrice, 
            dto.vatRate, 
            dto.variations.map(OrderItemVariationMapperInstance.toModel));
    }

    toDTO(model: OrderItem) : OrderItemDTO {
        return {
            id: model.id,
            name: model.name,
            basePrice: model.basePrice,
            vatRate: model.vatRate,
            variations: model.variations.map(OrderItemVariationMapperInstance.toDTO)
        };
    }
}

export const OrderItemMapperInstance = new OrderItemMapper();