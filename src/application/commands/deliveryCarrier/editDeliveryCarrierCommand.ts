import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";

export interface EditDeliveryCarrierCommand {
    id: string;
    name: string;
}

export class EditDeliveryCarrierCommandHandler {
    constructor(private _deliveryCarrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: EditDeliveryCarrierCommand) {
        const deliveryCarrier = await deliveryCarrierRepository.getById(cmd.id);
        if(!deliveryCarrier) return;

        deliveryCarrier.name = cmd.name;

        await deliveryCarrierRepository.update(deliveryCarrier);
        this._deliveryCarrierStore.update(DeliveryCarrierMapperInstance.toDTO(deliveryCarrier));

        return deliveryCarrier
    }
}