import { Order } from "@/domain/order/models/order";
import { OrderDTO } from "@/application/dto/orderDTO";
import { LocalRepository } from "./localRepository";
import { encryptedStorageInstance } from "../persistence/EncryptedStorage";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";

export class OrderRepository extends LocalRepository<Order, OrderDTO> {}

const STORAGE_KEY = 'orders';

export const orderRepository = new OrderRepository(encryptedStorageInstance, OrderMapperInstance, STORAGE_KEY);