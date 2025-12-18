
import { Order } from "@/domain/order/models/order";
import { OrderDTO } from "@/application/dto/orderDTO";
import { IMapper } from "./type";
import { OrderItemMapperInstance } from "./orderItemMapper";

export class OrderMapper implements IMapper<Order, OrderDTO> {
    toModel(dto: OrderDTO): Order {
        return new Order(
            dto.id,
            dto.partnerId,
            dto.status,
            dto.direction,
            dto.items.map(OrderItemMapperInstance.toModel),
            dto.dueDate,
            dto.createdDate,
            dto.sentDate
        );
    }

    toDTO(model : Order): OrderDTO {
        return {
            id: model.id,
            partnerId: model.partnerId,
            createdDate: model.createdDate,
            dueDate: model.dueDate,
            sentDate: model.sentDate,
            status: model.status,
            direction: model.direction,
            items: model.items.map(OrderItemMapperInstance.toDTO)
        };
    }
}

export const OrderMapperInstance = new OrderMapper();