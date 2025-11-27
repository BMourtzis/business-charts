import { createAddress } from "@/domain/contact/models/address";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";

export interface AddCarrierAddressCommand {
    carrierId: string;
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class AddCarrierAddressCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: AddCarrierAddressCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        const address = createAddress(
            cmd.street, 
            cmd.city,
            cmd.zip,
            cmd.country,
            cmd.isPrimary,
            cmd.name
        );
        carrier.addAddress(address);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}

export interface EditCarrierAddressCommand {
    carrierId: string;
    addressId: string
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class EditCarrierAddressCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: EditCarrierAddressCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;
        
        const newAddress = createAddress(
            cmd.street, 
            cmd.city,
            cmd.zip,
            cmd.country,
            cmd.isPrimary,
            cmd.name
        );
        carrier.editAddress(cmd.addressId, newAddress);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}

export interface RemoveCarrierAddressCommand {
    carrierId: string,
    addressId: string
}

export class RemoveCarrierAddressCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: RemoveCarrierAddressCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        carrier.removeAddress(cmd.addressId);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}