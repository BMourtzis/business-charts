import { DeliveryCarrierDTO } from '@/application/dto/deliveryCarrierDTO';
import { DeliveryCarrierMapper } from '@/application/mapper/deliverCarrierMapper';
import { defineStore } from 'pinia';

export const useDeliveryCarrierStore = defineStore("deliveryCarries", {
    state: () => ({
        deliverCarriers: [] as DeliveryCarrierDTO[]
    }),
    getters: {
        getById: (state) => {
            return (id: string) => {
                const dto = state.deliverCarriers.find(d => d.id === id);
                return dto ? DeliveryCarrierMapper.toModel(dto): undefined;
            }
        },
        carriers: (state) => {
            const dtos = state.deliverCarriers;
            return dtos ? dtos.map(DeliveryCarrierMapper.toModel) : undefined;
        }
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