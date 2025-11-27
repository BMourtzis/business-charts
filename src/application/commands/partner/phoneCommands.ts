import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapperInstance } from "../../mapper/partnerMapper";
import { createPhone } from "@/domain/contact/models/contact";

export interface AddPartnerPhoneCommand {
    partnerId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class AddPartnerPhoneCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: AddPartnerPhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const phone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        partner.addPhone(phone);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapperInstance.toDTO(partner));

        return partner;
    }
}

export interface EditPartnerPhoneCommand {
    partnerId: string;
    phoneId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class EditPartnerPhoneCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditPartnerPhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const newPhone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        partner.editPhone(cmd.phoneId, newPhone);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapperInstance.toDTO(partner));

        return partner;
    }
}

export interface RemovePartnerPhoneCommand {
    partnerId: string,
    phoneId: string
}

export class RemovePartnerPhoneCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: RemovePartnerPhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removePhone(cmd.phoneId);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapperInstance.toDTO(partner));

        return partner;
    }
}