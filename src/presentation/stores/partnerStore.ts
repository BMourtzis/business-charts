import { PartnerDTO } from '@/application/dto/partnerDTO';
import { defineStore } from 'pinia';

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [] as PartnerDTO[]
    }),
    getters: {
        getById: (state) => {
            return (id: string) => state.partners.find(partner => partner.id === id);
        },
        customers: (state) => {
            return state.partners.filter(partner => partner.type === 'customer');
        },
        suppliers: (state) => {
            return state.partners.filter(partner => partner.type === 'supplier');
        }
    },
    actions: {
        setPartners(partners: PartnerDTO[]) {
            this.partners = partners;
        },
        add(partner: PartnerDTO) {
            this.partners.push(partner);
        },
        update(updatedPartner: PartnerDTO) {
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