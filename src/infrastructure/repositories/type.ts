import { type PartnerDTO } from "@/application/dto/partnerDTO";
import { type IEntityDTO } from "@/application/dto/type";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { Partner } from "@/domain/partner/models/partner";
import { Supplier } from "@/domain/partner/models/supplier";
import { type IEntity } from "@/domain/type";

export interface IRepository<T extends IEntity, DTO extends IEntityDTO> {
    getAll(): Promise<DTO[]>;
    saveAll(items: DTO[]): Promise<void>;
    load(): Promise<T[]>;
    getById(id: string): Promise<T | undefined>;
    add(item: T): Promise<void>;
    update(item: T): Promise<void>;
    remove(id: string): Promise<void>;
    removeAll(): Promise<void>
}

export interface IPartnerRepository extends IRepository<Partner, PartnerDTO> {
    getSupplierById(id: string): Promise<Supplier | undefined>;
    getB2BCustomerById(id: string): Promise<B2BCustomer | undefined>;
}