
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
            dto.vatRate,
            dto.items.map(OrderItemMapperInstance.toModel),
            dto.dueDate,
            dto.createdDate,
            dto.approvedDate,
            dto.cancelledDate,
            dto.completedDate,
            dto.notes,
            dto.discountAmount,
            dto.depositAmount
        );
    }

    toDTO(model : Order): OrderDTO {
        return {
            id: model.id,
            partnerId: model.partnerId,
            status: model.status,
            direction: model.direction,
            items: model.items.map(OrderItemMapperInstance.toDTO),
            notes: model.notes,

            vatRate: model.vatRate,
            discountAmount: model.discountAmount,
            depositAmount: model.depositAmount,

            createdDate: model.createdDate,
            dueDate: model.dueDate,
            approvedDate: model.approvedDate,
            cancelledDate: model.cancelledDate,
            shippedDate: model.shippedDate,
            completedDate: model.completedDate
        };
    }
}

export const OrderMapperInstance = new OrderMapper();