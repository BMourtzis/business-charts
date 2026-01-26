import { computed } from "vue";
import { storeToRefs } from "pinia";

import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";

import { useOrdersStore } from "@/presentation/stores/orderStore";
import { CreateCreditOrderCommmandHandler } from "@/application/commands/order/createCreditOrderCommand";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { Order } from "@/domain/order/models/order";
import { DeleteOrderCommandHandler } from "@/application/commands/order/deleteOrderCommand";

export function useOrders() {
    const store = useOrdersStore();
    const { allOrders } = storeToRefs(store)

    return {
        allOrders: computed(() => allOrders.value.map(OrderMapperInstance.toModel) as Order[]),
        totalsPerPartner: computed(() => store.totalsPerPartner),
        globalTotals: computed(() => store.globalTotals),
        creditOrders: store.creditOrders,
        debitOrders: store.debitOrders,
        totalCredited: store.totalCredited,
        totalDebited: store.totalDebited,
        balance: store.balance,
        getOrderById,
        getOrdersForPartner,
        createCreditOrderCommmandHandler: new CreateCreditOrderCommmandHandler(store),
        deleteOrderCommmandHandler: new DeleteOrderCommandHandler(store),
    }
}