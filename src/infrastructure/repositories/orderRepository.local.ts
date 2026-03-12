import { Order } from "@/domain/order/models/order";
import { type OrderDTO } from "@/application/dto/orderDTO";
import { LocalRepository } from "./localRepository";
import { encryptedStorageInstance } from "../persistence/EncryptedStorage";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import type { MoneyAllocation } from "@/domain/order/models/moneyAllocation";

export class OrderRepository extends LocalRepository<Order, OrderDTO> {
    async getAllocationsFromMovementId(movementId: string): Promise<MoneyAllocation[]> {
        const all = await this.load();

        return all
            .flatMap(o => o.allocations)
            .filter(a => a.moneyMovementId === movementId);
    }
}

const STORAGE_KEY = 'orders';

export const orderRepository = new OrderRepository(encryptedStorageInstance, OrderMapperInstance, STORAGE_KEY);