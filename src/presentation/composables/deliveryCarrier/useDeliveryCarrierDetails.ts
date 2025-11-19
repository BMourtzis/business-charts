import { DeliveryCarrierMapper } from "@/application/mapper/deliverCarrierMapper";

import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";

export function getCarrierDetails(deliveryCarrierId: string) {
    const store = useDeliveryCarrierStore();

    const carrier = store.getById(deliveryCarrierId);
    if(!carrier) return undefined;

    return DeliveryCarrierMapper.toModel(carrier);
}

