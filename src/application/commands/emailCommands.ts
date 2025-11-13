import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { createEmail } from "@/domain/models/partner/contact";

export interface AddEmailCommand {
    partnerId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class AddEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: AddEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const email = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.addEmail(email);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}


export interface EditEmailCommand {
    partnerId: string;
    emailId: string;
    email: string;
    name?: string;
    isPrimary?: boolean
}

export class EditEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const newEmail = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.editEmail(cmd.emailId, newEmail);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemoveEmailCommand {
    partnerId: string,
    emailId: string
}

export class RemoveEmailCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: RemoveEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeEmail(cmd.emailId);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}