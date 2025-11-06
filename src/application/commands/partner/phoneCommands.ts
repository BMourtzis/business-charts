import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { fromPartnerDTO, toPartnerDTO } from "../../mapper/partnerMapper";

export async function addPhoneCommand(partnerId: string, phone: string, name?: string, isPrimary = false) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.addPhone(phone, isPrimary, name);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}

export async function editPhoneCommand(partnerId: string, phoneId: string, newPhone: string, isPrimary: boolean, newName?: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.editPhone(phoneId, newPhone, isPrimary, newName);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}


export async function removePhoneCommand(partnerId: string, phoneId: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return; 

    const partner = fromPartnerDTO(dto);
    partner.removePhone(phoneId);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}