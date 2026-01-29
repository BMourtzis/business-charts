import { defineStore } from 'pinia';

import { Order } from '@/domain/order/models/order';
import { type OrderDTO } from '@/application/dto/orderDTO';
import { OrderMapperInstance } from '@/application/mapper/orderMapper';
import { OrderType } from '@/domain/order/orderTypes';

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
        allOrders: (state) => state.orders,
        getOrderById: (state) => {
            return (id: string): OrderDTO | undefined => state.orders.find(o => o.id === id);
        },
        getOrdersByPartnerId: (state) => {
            return (partnerId: string) => state.orders
                .filter(o => o.partnerId === partnerId)
                .map(OrderMapperInstance.toModel) as Order[];
        },
        getOrdersByMovmementId: (state) => {
            return (movementId: string, partnerId: string) => state.orders
                .filter(o => o.partnerId === partnerId)
                .filter(o => o.allocations.some(a => a.moneyMovementId === movementId))
                .map(o => ({
                    ...o,
                    allocations: o.allocations.filter(a => a.moneyMovementId === movementId)
                }))
                .map(OrderMapperInstance.toModel) as Order[];
        },
        //Calculates total for all partners and caches it
        totalsPerPartner(): Record<string, AmountsRecord>{
            const result: Record<string, AmountsRecord> = {}
            const allOrders = this.allOrders.map(OrderMapperInstance.toModel) as Order[]

            for(const o of allOrders) {
                if(!result[o.partnerId]) {
                    result[o.partnerId] = { credited: 0, debited: 0, balance: 0};
                }

                if(o.type === OrderType.Sales) {
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
            const allOrders = this.allOrders.map(OrderMapperInstance.toModel) as Order[];

            for(const o of allOrders) {
                if(o.type === OrderType.Sales) credited += o.totalAmount;
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
                    order.type === OrderType.Sales && 
                    (!partnerId || order.partnerId === partnerId)
                );
        },
        debitOrders: (state) => {
            return (partnerId?: string) => 
                state.orders.filter(order => 
                    order.type === OrderType.Sales &&
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
        setOrders(orders: OrderDTO[]) {
            this.orders = orders;
        },
        add(order: OrderDTO) {
            this.orders.push(order);
        },
        update(updatedOrder: OrderDTO) {
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