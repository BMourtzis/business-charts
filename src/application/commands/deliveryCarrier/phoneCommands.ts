import { createPhone } from "@/domain/contact/models/contact";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { DeliveryCarrierMapper } from "@/application/mapper/deliverCarrierMapper";

export interface AddCarrierPhoneCommand {
    carrierId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class AddCarrierPhoneCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: AddCarrierPhoneCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        const phone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        carrier.addPhone(phone);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapper.toDTO(carrier));

        return carrier;
    }
}

export interface EditCarrierPhoneCommand {
    carrierId: string;
    phoneId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class EditCarrierPhoneCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: EditCarrierPhoneCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        const newPhone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        carrier.editPhone(cmd.phoneId, newPhone);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapper.toDTO(carrier));

        return carrier;
    }
}

export interface RemoveCarrierPhoneCommand {
    carrierId: string,
    phoneId: string
}

export class RemoveCarrierPhoneCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: RemoveCarrierPhoneCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        carrier.removePhone(cmd.phoneId);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapper.toDTO(carrier));

        return carrier;
    }
}