import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { Contact } from "@/domain/models/partner/contact";

export async function addPhoneCommand(partnerId: string, phone: Contact) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.addPhone(phone);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}

export async function editPhoneCommand(partnerId: string, phoneId: string, newPhone: Contact) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.editPhone(phoneId, newPhone);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}


export async function removePhoneCommand(partnerId: string, phoneId: string) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.removePhone(phoneId);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}