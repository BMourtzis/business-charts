import { computed } from "vue";
import { useOrdersStore } from "../stores/orderStore";
import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";
import { createCreditOrderCommand, createDebitOrderCommand } from "@/application/commands/order/createOrderCommand";
import { updateOrderStatusCommand } from "@/application/commands/order/updateOrderCommand";
import { addOrderItemCommand, removeOrderItemCommand, updateOrderItemCommand } from "@/application/commands/order/updateOrderItemCommand";
import { deleteOrderComand } from "@/application/commands/order/deleteOrderCommand";

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
        getOrdersForPartner,
        createDebitOrderCommand,
        createCreditOrderCommand,
        updateOrderStatusCommand,
        addOrderItemCommand,
        removeOrderItemCommand,
        updateOrderItemCommand,
        deleteOrderComand
    }
}