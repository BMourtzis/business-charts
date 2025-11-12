import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { Address } from "@/domain/models/partner/address";

export async function addAddressCommand(partnerId: string, address: Address) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.addAddress(address);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}

export async function editAddressCommand(partnerId: string, addressId: string, newAddress: Address) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.editAddress(addressId, newAddress);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}


export async function removeAddressCommand(partnerId: string, addressId: string) {
    const partner = await partnerRepository.getById(partnerId);
    if (!partner) return;

    partner.removeAddress(addressId);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}