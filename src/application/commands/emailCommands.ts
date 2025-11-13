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
    async handle(cmd: AddEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const email = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.addEmail(email);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

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
    async handle(cmd: EditEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const newEmail = createEmail(cmd.email, cmd.isPrimary, cmd.name);
        partner.editEmail(cmd.emailId, newEmail);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemoveEmailCommand {
    partnerId: string,
    emailId: string
}

export class RemoveEmailCommandHandler {
    async handle(cmd: RemoveEmailCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeEmail(cmd.emailId);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}