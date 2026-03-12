import { v4 as uuidv4 } from "uuid";

import { MoneyAllocation } from "@/domain/order/models/moneyAllocation";
import type { MoneyAllocationDTO } from "../dto/orderDTO";

export class MoneyAllocationMapper {
    toModel(dto: MoneyAllocationDTO): MoneyAllocation {
        return new MoneyAllocation(
            dto.allocationId ?? uuidv4(), //For migration purposes
            dto.moneyMovementId,
            dto.amount,
            dto.direction,
            dto.refundFor,
            getDate(dto.allocatedAt),
        );
    }

    toDTO(model: MoneyAllocation): MoneyAllocationDTO {
        return {
            allocationId: model.allocationId,
            moneyMovementId: model.moneyMovementId,
            amount: model.amount,
            direction: model.direction,
            refundFor: model.refundFor,
            allocatedAt: model.allocatedAt.toISOString()
        }
    }
}

function getDate(isoString: string): Date {
    return new Date(isoString);
}

export const MoneyAllocationMapperInstance = new MoneyAllocationMapper();