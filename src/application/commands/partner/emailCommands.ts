import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../../mapper/partnerMapper";
import { createEmail } from "@/domain/contact/models/contact";

export interface AddPartnerEmailCommand {
    partnerId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class AddPartnerEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: AddPartnerEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const email = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.addEmail(email);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}


export interface EditPartnerEmailCommand {
    partnerId: string;
    emailId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class EditPartnerEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditPartnerEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const newEmail = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.editEmail(cmd.emailId, newEmail);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemovePartnerEmailCommand {
    partnerId: string,
    emailId: string
}

export class RemovePartnerEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: RemovePartnerEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeEmail(cmd.emailId);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}