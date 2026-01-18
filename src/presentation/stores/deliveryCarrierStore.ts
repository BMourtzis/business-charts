import { type DeliveryCarrierDTO } from '@/application/dto/deliveryCarrierDTO';
import { defineStore } from 'pinia';

export const useDeliveryCarrierStore = defineStore("deliveryCarriers", {
    state: () => ({
        deliverCarriers: [] as DeliveryCarrierDTO[]
    }),
    getters: {
        all: (state) => state.deliverCarriers,
        getById: (state) => (id: string) => 
            state.deliverCarriers.find(p => p.id === id),
    },
    actions: {
        setCarriers(carriers: DeliveryCarrierDTO[]) {
            this.deliverCarriers = carriers;
        },
        add(carrier: DeliveryCarrierDTO) {
            this.deliverCarriers.push(carrier);
        },
        update(updatedCarrier: DeliveryCarrierDTO) {
            const index = this.deliverCarriers.findIndex(c => c.id === updatedCarrier.id);
            if (index !== -1) {
                this.deliverCarriers[index] = updatedCarrier;
            }
        },
        remove(id: string) {
            this.deliverCarriers = this.deliverCarriers.filter(c => c.id !== id);
        }
    }
});