import { computed } from "vue";
import { useOrdersStore } from "../stores/orderStore";
import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";

export function useOrders() {
    const store = useOrdersStore();

    return {
        totalsPerPartner: computed(() => store.totalsPerPartner),
        globalTotals: computed(() => store.globalTotals),
        creditOrders: store.creditOrders,
        debitOrders: store.debitOrders,
        totalCredited: store.totalCredited,
        totalDebited: store.totalDebited,
        balance: store.balance,
        getOrderById,
        getOrdersForPartner
    }
}