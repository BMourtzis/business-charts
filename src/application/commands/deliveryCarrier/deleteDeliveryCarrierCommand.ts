import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";

export interface DeleteDeliveryCarrierCommand {
    id: string;
}

export class DeleteDeliveryCarrierCommandHandler {
    constructor(private _deliveryCarrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: DeleteDeliveryCarrierCommand) {
        await deliveryCarrierRepository.remove(cmd.id);
        this._deliveryCarrierStore.remove(cmd.id);
    }
}