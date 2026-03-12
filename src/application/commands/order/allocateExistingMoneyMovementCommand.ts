import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { AllocationDirectionResolver } from "@/domain/allocations/AllocationDirectionResolver";
import type { Order } from "@/domain/order/models/order";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import type { MoneyDirection } from "@/domain/payment/MoneyMovementTypes";
import { moneyMovementRepository } from "@/infrastructure/repositories/moneyMovementRepository.local";
import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export interface AllocateExistingMoneyMovementCommand {
    orderId: string;
    moneyMovementId: string;
    amount: number;
    allocatedAt?: Date;
}

export class AllocateExistingMoneyMovementCommandHandler {
    constructor(
        private _orderStore = useOrdersStore()
    ) {}

    async handle(cmd: AllocateExistingMoneyMovementCommand) {
        const order = await this.getOrder(cmd.orderId);
        const movement = await this.getMoneyMovement(cmd.moneyMovementId);

        this.assertAllocationAmount(cmd.moneyMovementId, cmd.amount);

        this.allocateMoneyToOrder(
            order,
            movement.direction,
            movement.id,
            cmd.amount
        );

        this.updateOrder(order);
    }

    private async getOrder(orderId: string): Promise<Order> {
        const order = await orderRepository.getById(orderId);

        if(!order) throw new Error(`Order with id ${orderId} not found`);

        return order;
    }

    private async getMoneyMovement(movementId: string): Promise<MoneyMovement> {
        const movement = await moneyMovementRepository.getById(movementId);

        if(!movement) throw new Error(`MoneyMovement with id ${movementId} not found`);

        return movement;
    }

    private async assertAllocationAmount(movementId: string, amount: number) {
        const allocations = await orderRepository.getAllocationsFromMovementId(movementId);

        const remainingAmount = allocations.reduce((sum, item) => sum + item.effectiveAmount, 0);

        if(remainingAmount < amount) throw new Error(`Unallocated amount for Money Movement (id: ${movementId}) is less than the amount to allocate. Amount to allocate: ${amount}, remaining amount: ${remainingAmount}`);
    }

    private allocateMoneyToOrder(
        order: Order,
        moneyDirection: MoneyDirection,
        movementId: string,
        amount: number
    ) {
        const allocationDirection = AllocationDirectionResolver.resolve(moneyDirection);

        order.allocateMoney(movementId, amount, allocationDirection);
    }

    private async updateOrder(order: Order): Promise<void> {
        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}