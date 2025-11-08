import { defineStore } from 'pinia';
import type { OrderDTO } from '@/domain/models/order';

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as OrderDTO[]
    })
});