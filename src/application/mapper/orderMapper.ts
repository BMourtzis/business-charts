
import { Order } from "@/domain/order/models/order";
import { OrderDTO } from "@/application/dto/orderDTO";
import { IMapper } from "./type";
import { OrderItemMapperInstance } from "./orderItemMapper";
import { YearlyClientSequence } from "@/domain/yearlySequence";

export class OrderMapper implements IMapper<Order, OrderDTO> {
    toModel(dto: OrderDTO): Order {
        return new Order(
            dto.id,
            YearlyClientSequence.fromFormatted(dto.orderNumber),
            dto.partnerId,
            dto.status,
            dto.direction,
            dto.vatRate,
            dto.items.map(OrderItemMapperInstance.toModel),
            getDateOrUndefined(dto.dueDate),
            getDate(dto.createdDate),
            getDateOrUndefined(dto.approvedDate),
            getDateOrUndefined(dto.cancelledDate),
            getDateOrUndefined(dto.completedDate),
            dto.notes,
            dto.discountAmount,
            dto.depositAmount
        );
    }

    toDTO(model : Order): OrderDTO {
        return {
            id: model.id,
            orderNumber: model.orderNumber,
            partnerId: model.partnerId,
            status: model.status,
            direction: model.direction,
            items: model.items.map(OrderItemMapperInstance.toDTO),
            notes: model.notes,

            vatRate: model.vatRate,
            discountAmount: model.discountAmount,
            depositAmount: model.depositAmount,

            createdDate: model.createdDate.toISOString(),
            dueDate: model.dueDate?.toISOString(),
            approvedDate: model.approvedDate?.toISOString(),
            cancelledDate: model.cancelledDate?.toISOString(),
            shippedDate: model.shippedDate?.toISOString(),
            completedDate: model.completedDate?.toISOString()
        };
    }
}

function getDateOrUndefined(isoString?: string): Date | undefined {
    if(!isoString) return undefined;

    return getDate(isoString);
}

function getDate(isoString: string): Date {
    return new Date(isoString);
}

export const OrderMapperInstance = new OrderMapper();