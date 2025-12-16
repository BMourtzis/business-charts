import { computed } from "vue";
import { storeToRefs } from "pinia";

import { getPartnerTypeStringResource } from "@/domain/partner/partnerTypes";

import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";
import { createCreditOrderCommand, createDebitOrderCommand } from "@/application/commands/order/createOrderCommand";
import { updateOrderStatusCommand } from "@/application/commands/order/updateOrderCommand";
import { addOrderItemCommand, removeOrderItemCommand, updateOrderItemCommand } from "@/application/commands/order/updateOrderItemCommand";
import { deleteOrderComand } from "@/application/commands/order/deleteOrderCommand";
import { PartnerDTO } from "@/application/dto/partnerDTO";

import { usePartnersStore } from "../stores/partnerStore";
import { useOrdersStore } from "../stores/orderStore";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

export function useOrders() {
    const store = useOrdersStore();
    const partnerStore = usePartnersStore();
    const partnerStoreRef = storeToRefs(partnerStore);

    const { tCap } = useLocalizationHelpers();

    return {
        allOrders: store.allOrders,
        partners: computed(() => partnerStoreRef.all.value),
        totalsPerPartner: computed(() => store.totalsPerPartner),
        globalTotals: computed(() => store.globalTotals),
        creditOrders: store.creditOrders,
        debitOrders: store.debitOrders,
        totalCredited: store.totalCredited,
        totalDebited: store.totalDebited,
        balance: store.balance,
        partnersToItemProps: getPartnersToItemProps(tCap),
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

function getPartnersToItemProps(tCap: (key: string) => string) {
    return (item: PartnerDTO) => {
        if(!item) return;

        return {
            title: item.businessName || item.contactName,
            value: item.id,
            subtitle: tCap(getPartnerTypeStringResource(item.type))
        };
    }
}