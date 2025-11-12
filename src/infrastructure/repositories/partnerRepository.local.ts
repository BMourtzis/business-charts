
import { PartnerDTO } from "@/application/dto/partnerDTO";
import { PartnerRepository } from "./type";
import { PartnerMapper } from "@/application/mapper/partnerMapper";
import { Supplier } from "@/domain/models/partner/supplier";
import { B2BCustomer } from "@/domain/models/partner/b2bCustomer";

const STORAGE_KEY = 'partners';

async function loadDTOs(): Promise<PartnerDTO[]> {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
}

async function saveDTOs(dtos: PartnerDTO[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
}

export const partnerRepository: PartnerRepository = {
    async getAll() {
        return loadDTOs();
    },
    async saveAll(partnerDtos) {
        return saveDTOs(partnerDtos);
    },
    async load() {
        const dtos = await loadDTOs();
        return dtos.map(PartnerMapper.toModel);
    },
    async getById(id: string) {
        const dtos = await loadDTOs();
        const partner = dtos.find(p => p.id === id);
        if(!partner) return undefined;

        return PartnerMapper.toModel(partner);
    },
    async getSupplierById(id: string) {
        const partner = await this.getById(id);
        if(!partner) return undefined;

        //check if this will work
        if(partner instanceof Supplier)
            return partner as Supplier;

        return undefined;
    },
    async getB2BCustomerById(id: string) {
        const partner = await this.getById(id);
        if(!partner) return undefined;

        if(partner instanceof B2BCustomer)
            return partner as B2BCustomer;

        return undefined;
    },
    async add(partner) {
        const dtos = await loadDTOs();
        dtos.push(PartnerMapper.toDTO(partner));
        saveDTOs(dtos);
    },
    async update(partner) {
        const dtos = await loadDTOs();
        const i = dtos.findIndex((o: PartnerDTO) => o.id === partner.id);
        if (i !== -1) dtos[i] = PartnerMapper.toDTO(partner);
        saveDTOs(dtos);
    },

    async remove(id) {
        const dtos = await loadDTOs();
        const filtered = dtos.filter((o: PartnerDTO) => o.id !== id);
        saveDTOs(filtered);
    },
    async removeAll() {
        await saveDTOs([]);
    }
};