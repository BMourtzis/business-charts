import { PartnerDTO } from "@/application/dto/partnerDTO";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { Partner } from "@/domain/partner/models/partner";
import { Supplier } from "@/domain/partner/models/supplier";

export interface IRepository<T, DTO> {
    getAll(): Promise<DTO[]>;
    saveAll(items: DTO[]): Promise<void>;
    load(): Promise<T[]>;
    getById(id: string): Promise<T | undefined>;
    add(order: T): Promise<void>;
    update(order: T): Promise<void>;
    remove(id: string): Promise<void>;
    removeAll(): Promise<void>
}

export interface IPartnerRepository extends IRepository<Partner, PartnerDTO> {
    getSupplierById(id: string): Promise<Supplier | undefined>;
    getB2BCustomerById(id: string): Promise<B2BCustomer | undefined>;
}