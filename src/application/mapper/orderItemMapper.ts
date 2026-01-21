import { Sku } from "@/domain/order/models/sku";
import type { OrderLineItemDTO } from "../dto/orderDTO";
import { OrderLineItem } from "@/domain/order/models/orderLineItem";

export class OrderItemMapper  {
    toModel(dto: OrderLineItemDTO): OrderLineItem {
        return new OrderLineItem(
            new Sku(dto.productCode, dto.variationSnapshot),
            dto.name,
            dto.unitPrice,
            dto.quantity
        );
    }

    toDTO(model: OrderLineItem) : OrderLineItemDTO {
        return {
            name: model.name,
            derivedSku: model.derivedSKU,
            quantity: model.quantity,
            unitPrice: model.unitPrice,
            productCode: model.productCode,
            variationSnapshot: model.sku.variationSnapshot
        };
    }
}

export const OrderItemMapperInstance = new OrderItemMapper();