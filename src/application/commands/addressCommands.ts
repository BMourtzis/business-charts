import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { fromPartnerDTO, toPartnerDTO } from "../mapper/partnerMapper";

export async function addAddressCommand(partnerId: string, address: string, name?: string, isPrimary = false) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.addAddress(address, isPrimary, name);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}

export async function editAddressCommand(partnerId: string, addressId: string, newAddress: string, isPrimary: boolean, newName?: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    partner.editAddress(addressId, newAddress, isPrimary, newName);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}


export async function removeAddressCommand(partnerId: string, addressId: string) {
    const store = usePartnersStore();
    const dto = store.getById(partnerId);
    if (!dto) return; 

    const partner = fromPartnerDTO(dto);
    partner.removeAddress(addressId);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}