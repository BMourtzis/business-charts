import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { createPhone } from "@/domain/models/partner/contact";

export interface AddPhoneCommand {
    partnerId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class AddPhoneCommandHandler {
    async handle(cmd: AddPhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const phone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        partner.addPhone(phone);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface EditPhoneCommand {
    partnerId: string;
    phoneId: string;
    phone: string;
    name?: string;
    isPrimary?: boolean
}

export class EditPhoneCommandHandler {
    async handle(cmd: EditPhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const newPhone = createPhone(cmd.phone, cmd.isPrimary, cmd.name);
        partner.editPhone(cmd.phoneId, newPhone);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemovePhoneCommand {
    partnerId: string,
    phoneId: string
}

export class RemovePhoneCommandHandler {
    async handle(cmd: RemovePhoneCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removePhone(cmd.phoneId);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}