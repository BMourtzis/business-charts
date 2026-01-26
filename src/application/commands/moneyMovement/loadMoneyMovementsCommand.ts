import { moneyMovementRepository } from "@/infrastructure/repositories/moneyMovementRepository.local";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";

export class LoadMoneyMovementsCommandHandler {
    constructor(private _movementStore = useMoneyMovementStore()) {}

    async handle() {
        const movements = await moneyMovementRepository.getAll();
        this._movementStore.setMovements(movements);
    }
}