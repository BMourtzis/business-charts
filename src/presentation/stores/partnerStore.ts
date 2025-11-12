import { DeliveryCarrierDTO } from '@/application/dto/deliveryCarrierDTO';
import { PartnerDTO } from '@/application/dto/partnerDTO';
import { PartnerMapper } from '@/application/mapper/partnerMapper';
import { B2BCustomer } from '@/domain/models/partner/b2bCustomer';
import { Supplier } from '@/domain/models/partner/supplier';
import { PartnerType } from '@/domain/types/partnerTypes';
import { defineStore } from 'pinia';

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [] as PartnerDTO[],
        deliverCarriers: [] as DeliveryCarrierDTO[]
    }),
    getters: {
        getById: (state) => {
            return (id: string) => {
                const dto = state.partners.find(partner => partner.id === id);
                return dto ? PartnerMapper.toModel(dto) : undefined;
            };
        },
        b2bCustomers: (state) => {
            const dtos = state.partners.filter(partner => partner.type === PartnerType.B2BCustomer);
            return dtos ? dtos.map(PartnerMapper.toModel) as B2BCustomer[] : undefined;
        },
        suppliers: (state) => {
            const dtos = state.partners.filter(partner => partner.type === PartnerType.Supplier);
            return dtos ? dtos.map(PartnerMapper.toModel) as Supplier[]: undefined;
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