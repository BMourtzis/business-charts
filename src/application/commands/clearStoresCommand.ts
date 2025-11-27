import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export interface ClearStoresCommand {
    removePartners: boolean;
    removeOrders: boolean;
    removeCarriers: boolean;
}

export class ClearStoresCommandHandler {
    constructor(
        private _partnersStore = usePartnersStore(),
        private _carrierStore = useDeliveryCarrierStore()
    ) {}

    async handle(cmd: ClearStoresCommand) {
        if(cmd.removePartners) this._partnersStore.setPartners([]);
        if(cmd.removeCarriers) this._carrierStore.setCarriers([]);
    }
}