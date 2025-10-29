import { Partner } from '@/domain/models/partner';
import { defineStore } from 'pinia';

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [] as Partner[]
    }),
    actions: {
        setPartners(partners: Partner[]) {
            this.partners = partners;
        },
        add(partner: Partner) {
            this.partners.push(partner);
        },
        update(updatedPartner: Partner) {
            const index = this.partners.findIndex(p => p.id === updatedPartner.id);
            if (index !== -1) {
                this.partners[index] = updatedPartner;
            }
        },
        remove(id: string) {
            this.partners = this.partners.filter(p => p.id !== id);
        }
    }
});