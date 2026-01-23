import { computed } from "vue";
import { storeToRefs } from "pinia";

import { getPartnerTypeStringResource } from "@/domain/partner/partnerTypes";

import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";
import type { PartnerDTO } from "@/application/dto/partnerDTO";

import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { useOrdersStore } from "@/presentation/stores/orderStore";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { CreateCreditOrderCommmandHandler } from "@/application/commands/order/createCreditOrderCommand";
import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { Order } from "@/domain/order/models/order";
import { DeleteOrderCommandHandler } from "@/application/commands/order/deleteOrderCommand";

export function useOrders() {
    const store = useOrdersStore();
    const { allOrders } = storeToRefs(store)

    const partnerStore = usePartnersStore();
    const { all } = storeToRefs(partnerStore);

    const { tCap } = useLocalizationHelpers();

    return {
        allOrders: computed(() => allOrders.value.map(OrderMapperInstance.toModel) as Order[]),
        partners: computed(() => all.value),
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
        createCreditOrderCommmandHandler: new CreateCreditOrderCommmandHandler(store),
        deleteOrderCommmandHandler: new DeleteOrderCommandHandler(store),
    }
}

//TODO: move to partners
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