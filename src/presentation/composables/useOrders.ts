import { computed } from "vue";
import { storeToRefs } from "pinia";

import { getPartnerTypeStringResource } from "@/domain/partner/partnerTypes";

import { getOrderById } from "@/application/queries/order/getOrderByIdQuery";
import { getOrdersForPartner } from "@/application/queries/order/getOrdersForPartnerQuery";
import { PartnerDTO } from "@/application/dto/partnerDTO";

import { usePartnersStore } from "../stores/partnerStore";
import { useOrdersStore } from "../stores/orderStore";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { CreateCreditOrderCommmandHandler } from "@/application/commands/order/createCreditOrderCommand";

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
        createCreditOrderCommmandHandler: new CreateCreditOrderCommmandHandler(store)
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