import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { AllocationDirectionResolver } from "@/domain/allocations/AllocationDirectionResolver";
import { MoneyMovementFactory } from "@/domain/payment/models/moneyMovementFactory";
import type { PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
import { moneyMovementRepository } from "@/infrastructure/repositories/moneyMovementRepository.local";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { MovementNumberService } from "@/infrastructure/services/movementNumberService";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface ApproveOrderCommand {
    orderId: string;
    deposit?: {
        amount: number;
        method: PaymentMethod
    }
}

export class ApproveOrderCommandHandler {
    constructor(
        private _orderStore = useOrdersStore(),
        private _moneyMovementStore = useMoneyMovementStore()
    ) {}

    async handle(cmd: ApproveOrderCommand) {
        const order = await orderRepository.getById(cmd.orderId);

        if(!order) throw new Error(`Order with id ${cmd.orderId} not found`);

        order.approve();

        if(cmd.deposit) {
            //create money movement
            const sequence = await MovementNumberService.getNext(order.partnerId);

            const moneyMovement = MoneyMovementFactory.createPaymentFromOrder(
                order.type,
                order.partnerId, 
                sequence, 
                cmd.deposit.amount, 
                cmd.deposit.method
            );

            //create moneyallocation
            const allocationDirection = AllocationDirectionResolver.resolve(moneyMovement.direction);

            order.allocateMoney(moneyMovement.id, cmd.deposit.amount, allocationDirection);

            await moneyMovementRepository.add(moneyMovement);
            this._moneyMovementStore.add(MoneyMovementMapperInstance.toDTO(moneyMovement));
        }

        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}