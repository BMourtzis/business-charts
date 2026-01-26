import { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import type { IMapper } from "./type";
import type { MoneyMovementDTO } from "../dto/moneyMovementDTO";
import { MovementYearlyClientSequence } from "@/domain/payment/movementYearlySequence";

export class MoneyMovementMapper implements IMapper<MoneyMovement, MoneyMovementDTO> {
    toModel(dto: MoneyMovementDTO): MoneyMovement {
        return new MoneyMovement(
            dto.id,
            MovementYearlyClientSequence.fromFormatted(dto.movementNumber),
            dto.partnerId,
            dto.amount,
            dto.method,
            dto.direction,
            dto.reason,
            getDate(dto.createdDate)
        )
    };

    toDTO(model: MoneyMovement): MoneyMovementDTO {
        return {
            id: model.id,
            partnerId: model.partnerId,
            amount: model.amount,
            method: model.method,
            direction: model.direction,
            reason: model.reason,
            createdDate: model.createdDate.toISOString(),
            movementNumber: model.movementNumber
        }
    }
}

function getDate(isoString: string): Date {
    return new Date(isoString);
}

export const MoneyMovementMapperInstance = new MoneyMovementMapper();