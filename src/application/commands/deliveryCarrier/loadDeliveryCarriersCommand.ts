import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";

export class LoadDeliveryCarriersCommandHandler {
    constructor(private _deliveryCarrierStore = useDeliveryCarrierStore()) {}

    async handle() {
        const deliveryCarriers = await deliveryCarrierRepository.load();
        this._deliveryCarrierStore.setCarriers(deliveryCarriers);
    }
}