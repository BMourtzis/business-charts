import type { MoneyMovementDTO } from '@/application/dto/moneyMovementDTO';
import { defineStore } from 'pinia';

export const usePaymentsStore = defineStore('payments', {
    state: () => ({
        moneyMovements: [] as MoneyMovementDTO[]
    }),
    getters: {
        allMovements: (state) => state.moneyMovements,
        getMoneyMovementById: (state) => {
            return (id: string): MoneyMovementDTO | undefined => 
                state.moneyMovements.find(o => o.id === id);
        },
        getMoneyMovementByPartnerId: (state) => {
            return (partnerId: string) => state.moneyMovements
                .filter(o => o.partnerId === partnerId);
        },
    }
});