import { Order } from "@/domain/models/order";
import { OrderDTO, OrderItemDTO } from "../dto/orderDTO";
import { OrderItem } from "@/domain/models/orderItem";

export function fromOrderDTO(dto: OrderDTO): Order {
    return new Order(
        dto.id,
        dto.partnerId,
        dto.status,
        dto.direction,
        dto.items.map(fromOrderItemDTO),
        dto.createdDate,
        dto.sentDate
    );
}

export function toOrderDTO(order: Order): OrderDTO {
    return {
        id: order.id,
        partnerId: order.partnerId,
        createdDate: order.createdDate,
        sentDate: order.sentDate,
        status: order.status,
        direction: order.direction,
        items: order.items.map(toOrderItemDTO)
    }
}

export function fromOrderItemDTO(dto: OrderItemDTO): OrderItem {
    return new OrderItem(dto.id, dto.name, dto.quantity, dto.basePrice, dto.vatRate);
}

export function toOrderItemDTO(item: OrderItem): OrderItemDTO {
    return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        basePrice: item.basePrice,
        vatRate: item.vatRate
    };
}