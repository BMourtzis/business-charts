import type { PartnerDTO } from '@/domain/models/partner';
import { defineStore } from 'pinia';

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        suppliers: [] as PartnerDTO[]
    }),
    persist: true
});