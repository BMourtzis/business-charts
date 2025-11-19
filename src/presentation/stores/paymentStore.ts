import { defineStore } from 'pinia';
import type { PaymentDTO } from '@/domain/payment/models/payment';

export const usePaymentsStore = defineStore('payments', {
    state: () => ({
        payments: [] as PaymentDTO[]
    })
});