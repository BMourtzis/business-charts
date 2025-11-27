import { AddressDTO } from "@/application/dto/contactDTO";
import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { createAddress } from "@/domain/contact/models/address";
import { createDeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";

export interface CreateDeliveryCarrierCommand {
    name: string;
    address: AddressDTO
}

export class CreateDeliveryCarrierCommandHandler {
    constructor(private _deliveryCarrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: CreateDeliveryCarrierCommand) {
        const address = createAddress(cmd.address.street, cmd.address.city, cmd.address.zip, cmd.address.country, cmd.address.isPrimary, cmd.address.name);
        const deliveryCarrier = createDeliveryCarrier(
            cmd.name,
            address
        );

        await deliveryCarrierRepository.add(deliveryCarrier);
        this._deliveryCarrierStore.add(DeliveryCarrierMapperInstance.toDTO(deliveryCarrier));

        return deliveryCarrier;
    }
}