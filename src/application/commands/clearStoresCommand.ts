import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import { useOrdersStore } from "@/presentation/stores/orderStore";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export interface ClearStoresCommand {
    removePartners: boolean;
    removeOrders: boolean;
    removeCarriers: boolean;
    removeMovements: boolean;
}

export class ClearStoresCommandHandler {
    constructor(
        private _partnersStore = usePartnersStore(),
        private _carrierStore = useDeliveryCarrierStore(),
        private _orderStore = useOrdersStore(),
        private _movementStore = useMoneyMovementStore()
    ) {}

    async handle(cmd: ClearStoresCommand) {
        if(cmd.removePartners) this._partnersStore.setPartners([]);
        if(cmd.removeCarriers) this._carrierStore.setCarriers([]);
        if(cmd.removeOrders) this._orderStore.setOrders([]);
        if(cmd.removeMovements) this._movementStore.setMovements([]);
    }
}