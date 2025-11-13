import { defineStore } from 'pinia';
import type { OrderDTO } from '@/domain/order/models/order';

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as OrderDTO[]
    })
});