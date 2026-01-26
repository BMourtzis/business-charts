import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";
import { MoneyMovementFactory } from "@/domain/payment/models/moneyMovementFactory";
import { MoneyMovementReason, type PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
import type { MovementYearlyClientSequence } from "@/domain/payment/movementYearlySequence";
import { moneyMovementRepository } from "@/infrastructure/repositories/moneyMovementRepository.local";
import { MovementNumberService } from "@/infrastructure/services/movementNumberService";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";

export interface CreateMoneyMovementCommand {
    partnerId: string;
    amount: number,
    method: PaymentMethod,
    reason: MoneyMovementReason
};

export class CreateMoneyMovementCommandHandler{
    constructor(private _movementStore = useMoneyMovementStore()) {}

    async handle(cmd: CreateMoneyMovementCommand) {
        const sequence = await MovementNumberService.getNext(cmd.partnerId);

        const movement = this.createMovement(cmd, sequence);

        await moneyMovementRepository.add(movement);
        this._movementStore.add(MoneyMovementMapperInstance.toDTO(movement));
    }

    createMovement(cmd: CreateMoneyMovementCommand, sequence: MovementYearlyClientSequence) {
        switch(cmd.reason) {
            case MoneyMovementReason.CustomerPayment:
                return MoneyMovementFactory.customerPayment(sequence, cmd.partnerId, cmd.amount, cmd.method);
            case MoneyMovementReason.SupplierPayment:
                return MoneyMovementFactory.supplierPayment(sequence, cmd.partnerId, cmd.amount, cmd.method);
            case MoneyMovementReason.CustomerRefund:
                return MoneyMovementFactory.customerRefund(sequence, cmd.partnerId, cmd.amount, cmd.method);
            default:
                throw new Error("Other reasons are not implemented yet");
        }
    }
}