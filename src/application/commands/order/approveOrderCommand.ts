import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { AllocationDirectionResolver } from "@/domain/allocations/AllocationDirectionResolver";
import type { Order } from "@/domain/order/models/order";
import type { OrderType } from "@/domain/order/orderTypes";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { MoneyMovementFactory } from "@/domain/payment/models/moneyMovementFactory";
import type { MoneyDirection, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
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
        const order = await this.getOrder(cmd.orderId);
        order.approve();

        if(cmd.deposit) {
            const moneyMovement = await this.createMoneyMovement(
                order.partnerId, 
                order.type, 
                cmd.deposit.amount,
                cmd.deposit.method
            );

            this.allocateMoneyToOrder(order, moneyMovement.direction, moneyMovement.id, cmd.deposit.amount);

            this.saveMoneyMovement(moneyMovement);
        }

        this.updateOrder(order);
    }

    private async getOrder(orderId: string): Promise<Order> {
        const order = await orderRepository.getById(orderId);

        if(!order) throw new Error(`Order with id ${orderId} not found`);

        return order;
    }

    private async createMoneyMovement(
        partnerId: string,
        orderType: OrderType,
        amount: number,
        method: PaymentMethod
    ): Promise<MoneyMovement> {
        const sequence = await MovementNumberService.getNext(partnerId);

        return MoneyMovementFactory.createPaymentFromOrder(
            orderType,
            partnerId, 
            sequence, 
            amount, 
            method
        );
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

    private async saveMoneyMovement(moneyMovement: MoneyMovement): Promise<void> {
        await moneyMovementRepository.add(moneyMovement);
        this._moneyMovementStore.add(MoneyMovementMapperInstance.toDTO(moneyMovement));
    }

    private async updateOrder(order: Order): Promise<void> {
        await orderRepository.update(order);
        this._orderStore.update(OrderMapperInstance.toDTO(order));
    }
}