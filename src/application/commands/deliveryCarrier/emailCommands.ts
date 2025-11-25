import { createEmail } from "@/domain/contact/models/contact";
import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";

export interface AddCarrierEmailCommand {
    carrierId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class AddCarrierEmailCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: AddCarrierEmailCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        const email = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        carrier.addEmail(email);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}


export interface EditCarrierEmailCommand {
    carrierId: string;
    emailId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class EditCarrierEmailCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: EditCarrierEmailCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        const newEmail = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        carrier.editEmail(cmd.emailId, newEmail);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}

export interface RemoveCarrierEmailCommand {
    carrierId: string,
    emailId: string
}

export class RemoveCarrierEmailCommandHandler {
    constructor(private _carrierStore = useDeliveryCarrierStore()) {}

    async handle(cmd: RemoveCarrierEmailCommand) {
        const carrier = await deliveryCarrierRepository.getById(cmd.carrierId);
        if (!carrier) return;

        carrier.removeEmail(cmd.emailId);

        await deliveryCarrierRepository.update(carrier);
        this._carrierStore.update(DeliveryCarrierMapperInstance.toDTO(carrier));

        return carrier;
    }
}