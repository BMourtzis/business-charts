import { defineStore } from 'pinia';

import { Order } from '@/domain/order/models/order';
import { OrderDTO } from '@/application/dto/orderDTO';
import { OrderMapperInstance } from '@/application/mapper/orderMapper';

export interface AmountsRecord {
    debited: number;
    credited: number;
    balance: number;
}

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as OrderDTO[]
    }),
    getters: {
        allOrders: (state) => {
            return state.orders.map(OrderMapperInstance.toModel);
        },
        getOrderById: (state) => {
            return (id: string): Order | undefined => state.orders.find(o => o.id === id) as Order | undefined;
        },
        getOrdersByPartnerId: (state) => {
            return (partnerId: string) => state.orders.filter(o => o.partnerId === partnerId) as Order[];
        },
        //Calculates total for all partners and caches it
        totalsPerPartner(): Record<string, AmountsRecord>{
            const result: Record<string, AmountsRecord> = {}
            for(const o of this.allOrders) {
                if(!result[o.partnerId]) {
                    result[o.partnerId] = { credited: 0, debited: 0, balance: 0};
                }

                if(o.direction === 'credit') {
                    result[o.partnerId].credited += o.totalAmount;
                    result[o.partnerId].balance += o.totalAmount;
                } else {
                    result[o.partnerId].debited += o.totalAmount;
                    result[o.partnerId].balance -= o.totalAmount;
                }
            }

            return result;
        },
        //Calculates global totals and caches it
        globalTotals(): AmountsRecord {
            let credited = 0, debited = 0;
            for(const o of this.allOrders) {
                if(o.direction === "credit") credited += o.totalAmount;
                else debited += o.totalAmount;
            }

            return {
                credited,
                debited,
                balance: credited - debited
            };
        },

        creditOrders: (state) => {
            return (partnerId?: string) => 
                state.orders.filter(order => 
                    order.direction === 'credit' && 
                    (!partnerId || order.partnerId === partnerId)
                );
        },
        debitOrders: (state) => {
            return (partnerId?: string) => 
                state.orders.filter(order => 
                    order.direction === 'debit' &&
                    (!partnerId || order.partnerId === partnerId)
                );
        },
        totalCredited(): (partnerId?: string) => number {
            return (partnerId?: string) => 
                partnerId
                ? this.totalsPerPartner[partnerId]?.credited ?? 0
                : this.globalTotals.credited;
        },
        totalDebited(): (partnerId?: string) => number {
            return (partnerId?: string) => 
                partnerId
                ? this.totalsPerPartner[partnerId]?.debited ?? 0
                : this.globalTotals.debited;
        },
        balance(): (partnerId?: string) => number {
            return (partnerId?: string) => 
                partnerId
                ? this.totalsPerPartner[partnerId]?.balance ?? 0
                : this.globalTotals.balance;
        }
    },
    actions: {
        setOrders(orders: Order[]) {
            this.orders = orders;
        },
        add(order: Order) {
            this.orders.push(order);
        },
        update(updatedOrder: Order) {
            const index = this.orders.findIndex(p => p.id === updatedOrder.id);
            if (index !== -1) {
                this.orders[index] = updatedOrder;
            }
        },
        remove(id: string) {
            this.orders = this.orders.filter(p => p.id !== id);
        }
    }
});