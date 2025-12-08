import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { PartnerMapperInstance } from "@/application/mapper/partnerMapper";
import { PartnerType } from "@/domain/partner/partnerTypes";

import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { computed } from "vue";

export function getCarrierDetails(deliveryCarrierId: string) {
    const store = useDeliveryCarrierStore();

    const carrier = store.getById(deliveryCarrierId);
    if(!carrier) return undefined;

    return DeliveryCarrierMapperInstance.toModel(carrier);
}

export function useCarrierCustomers(carrierId: string) {
    const partnersStore = usePartnersStore();

    const b2bCustomers = computed(() => 
        partnersStore
            .getByType(PartnerType.B2BCustomer)
            .filter(p => p.deliveryCarrierId === carrierId)
            .map(PartnerMapperInstance.toModel)
    );

    return { b2bCustomers };
}

