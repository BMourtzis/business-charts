
import { PartnerDTO } from "@/application/dto/partnerDTO";
import { Repository } from "./type";
import { fromPartnerDTO, toPartnerDTO } from "@/application/mapper/partnerMapper";
import { Partner } from "@/domain/models/partner";

const STORAGE_KEY = 'partners';

async function loadDTOs(): Promise<PartnerDTO[]> {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
}

async function saveDTOs(dtos: PartnerDTO[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
}

export const partnerRepository: Repository<Partner, PartnerDTO> = {
    async getAll() {
        return loadDTOs();
    },
    async saveAll(partnerDtos) {
        return saveDTOs(partnerDtos);
    },
    async load() {
        const dtos = await loadDTOs();
        console.log(dtos);
        return dtos.map(fromPartnerDTO);
    },
    async add(partner) {
        const dtos = await loadDTOs();
        dtos.push(toPartnerDTO(partner));
        saveDTOs(dtos);
    },
    async update(partner) {
        const dtos = await loadDTOs();
        const i = dtos.findIndex((o: PartnerDTO) => o.id === partner.id);
        if (i !== -1) dtos[i] = toPartnerDTO(partner);
        saveDTOs(dtos);
    },

    async remove(id) {
        const dtos = await loadDTOs();
        const filtered = dtos.filter((o: PartnerDTO) => o.id !== id);
        saveDTOs(filtered);
    }
};