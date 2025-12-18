import { OrderItemVariation } from "@/domain/order/models/orderItemVariation";
import { OrderItemVariationDTO } from "../dto/orderDTO";

export class OrderItemVariationMapper {
    toModel(dto: OrderItemVariationDTO): OrderItemVariation {
        return new OrderItemVariation(
            dto.quantity,
            dto.attributes
        );
    }

    toDTO(model: OrderItemVariation): OrderItemVariationDTO {
        return {
            quantity: model.quantity,
            attributes: model.attributes
        };
    }
}

export const OrderItemVariationMapperInstance = new OrderItemVariationMapper();