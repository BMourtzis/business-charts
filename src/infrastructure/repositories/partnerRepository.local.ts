
import { PartnerDTO } from "@/application/dto/partnerDTO";
import { IPartnerRepository } from "./type";
import { PartnerMapperInstance } from "@/application/mapper/partnerMapper";
import { Supplier } from "@/domain/partner/models/supplier";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { LocalRepository } from "./localRepository";
import { Partner } from "@/domain/partner/models/partner";
import { LocalStorage } from "../persistence/LocalStorage";

export class PartnerRepository extends LocalRepository<Partner, PartnerDTO> implements IPartnerRepository { 
    async getSupplierById(id: string) {
        const partner = await this.getById(id);
        if(!partner) return undefined;

        if(partner instanceof Supplier)
            return partner as Supplier;

        return undefined;
    }

    async getB2BCustomerById(id: string) {
        const partner = await this.getById(id);
        if(!partner) return undefined;

        if(partner instanceof B2BCustomer)
            return partner as B2BCustomer;

        return undefined;
    }
}

const STORAGE_KEY = 'partners';

export const partnerRepository = new PartnerRepository(LocalStorage, PartnerMapperInstance, STORAGE_KEY);