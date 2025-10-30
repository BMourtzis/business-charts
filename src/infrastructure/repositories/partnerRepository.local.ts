import { Partner } from "@/domain/models/partner";
import { PartnerRepository } from "./type";

const STORAGE_KEY = 'partners';

export const partnerRepository: PartnerRepository = {
    async load() {
        const json = localStorage.getItem(STORAGE_KEY);
        if (!json) return [];
        const plainPartners = JSON.parse(json);
        return plainPartners.map((p: any) => {
            return Object.assign(new Partner(p._id, p._name, p._type), p);
        });
    },
    async add(partner) {
        const all = await this.load();
        all.push(partner);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    },
    async update(partner) {
        const all = await this.load();
        const i = all.findIndex((o: Partner) => o.id === partner.id);
        if (i !== -1) all[i] = partner;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    },

    async remove(id) {
        const all = await this.load();
        const filtered = all.filter((o: Partner) => o.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};