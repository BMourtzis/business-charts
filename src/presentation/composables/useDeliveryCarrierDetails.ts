import { computed } from "vue";
import { useDeliveryCarrierStore } from "../stores/deliveryCarrierStore";
import { DeliveryCarrierMapper } from "@/application/mapper/deliverCarrierMapper";

export function getCarrierDetails(deliveryCarrierId: string) {
    const store = useDeliveryCarrierStore();

    return computed(() => {
        const carrier = store.getById(deliveryCarrierId);
        if(!carrier) return undefined;

        return DeliveryCarrierMapper.toModel(carrier);
    });
}