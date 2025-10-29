import { defineStore } from 'pinia';
import type { OrderDTO } from '@/models/order';

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as OrderDTO[]
    }),
    persist: true
});