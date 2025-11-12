import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { Contact } from "@/domain/models/partner/contact";

export async function addEmailCommand(partnerId: string, email: Contact) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.addEmail(email);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}

export async function editEmailCommand(partnerId: string, emailId: string, newEmail: Contact) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.editEmail(emailId, newEmail);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}


export async function removeEmailCommand(partnerId: string, emailId: string) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.removeEmail(emailId);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}