import { Order } from "@/domain/models/order";
import { Partner } from "@/domain/models/partner";

export interface OrderRepository {
    load(): Promise<Order[]>;
    add(order: Order): Promise<void>;
    update(order: Order): Promise<void>;
    remove(id: string): Promise<void>;
}

export interface PartnerRepository {
    load(): Promise<Partner[]>;
    add(partner: Partner): Promise<void>;
    update(partner: Partner): Promise<void>;
    remove(id: string): Promise<void>;
}