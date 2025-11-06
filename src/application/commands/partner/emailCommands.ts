import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { fromPartnerDTO, toPartnerDTO } from "../../mapper/partnerMapper";

export async function addEmailCommand(partnerId: string, email: string, name?: string, isPrimary = false) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.addEmail(email, isPrimary, name);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}

export async function editEmailCommand(partnerId: string, emailId: string, newEmail: string, isPrimary: boolean, newName?: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.editEmail(emailId, newEmail, isPrimary, newName);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}


export async function removeEmailCommand(partnerId: string, emailId: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return; 

    const partner = fromPartnerDTO(dto);
    partner.removeEmail(emailId);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}