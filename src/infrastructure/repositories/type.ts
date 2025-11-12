import { PartnerDTO } from "@/application/dto/partnerDTO";
import { B2BCustomer } from "@/domain/models/partner/b2bCustomer";
import { Partner } from "@/domain/models/partner/partner";
import { Supplier } from "@/domain/models/partner/supplier";

export interface Repository<T, DTO> {
    getAll(): Promise<DTO[]>;
    saveAll(items: DTO[]): Promise<void>;
    load(): Promise<T[]>;
    getById(id: string): Promise<T | undefined>;
    add(order: T): Promise<void>;
    update(order: T): Promise<void>;
    remove(id: string): Promise<void>;
    removeAll(): Promise<void>
}

export interface PartnerRepository extends Repository<Partner, PartnerDTO> {
    getSupplierById(id: string): Promise<Supplier | undefined>;
    getB2BCustomerById(id: string): Promise<B2BCustomer | undefined>;
}