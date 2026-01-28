import { MoneyAllocation } from "@/domain/order/models/moneyAllocation";
import type { MoneyAllocationDTO } from "../dto/orderDTO";

export class MoneyAllocationMapper {
    toModel(dto: MoneyAllocationDTO): MoneyAllocation {
        return new MoneyAllocation(
            dto.moneyMovementId,
            dto.amount,
            dto.direction,
            getDate(dto.allocatedAt)
        );
    }

    toDTO(model: MoneyAllocation): MoneyAllocationDTO {
        return {
            moneyMovementId: model.moneyMovementId,
            amount: model.amount,
            direction: model.direction,
            allocatedAt: model.allocatedAt.toISOString()
        }
    }
}

function getDate(isoString: string): Date {
    return new Date(isoString);
}

export const MoneyAllocationMapperInstance = new MoneyAllocationMapper();