import { OrderItemVariation } from "@/domain/order/models/orderItemVariation";
import type { OrderItemVariationDTO } from "../dto/orderDTO";

export class OrderItemVariationMapper {
    toModel(dto: OrderItemVariationDTO): OrderItemVariation {
        return new OrderItemVariation(
            dto.quantity,
            dto.price,
            dto.attributes
        );
    }

    toDTO(model: OrderItemVariation): OrderItemVariationDTO {
        return {
            quantity: model.quantity,
            attributes: model.attributes,
            price: model.price,
            normalizedAttributes: model.normalizedAttributes
        };
    }
}

export const OrderItemVariationMapperInstance = new OrderItemVariationMapper();