import type { MoneyMovementDTO } from '@/application/dto/moneyMovementDTO';
import { defineStore } from 'pinia';

export const useMoneyMovementStore = defineStore('payments', {
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
    },
    actions: {
        setMovements(moneyMovements: MoneyMovementDTO[]) {
            this.moneyMovements = moneyMovements;
        },
        add(moneyMovement: MoneyMovementDTO) {
            this.moneyMovements.push(moneyMovement);
        },
        update(updatedOrder: MoneyMovementDTO) {
            const index = this.moneyMovements.findIndex(p => p.id === updatedOrder.id);
            if (index !== -1) {
                this.moneyMovements[index] = updatedOrder;
            }
        },
        remove(id: string) {
            this.moneyMovements = this.moneyMovements.filter(p => p.id !== id);
        }
    }
});