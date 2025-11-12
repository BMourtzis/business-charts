import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { AddressDTO } from "../dto/contactDTO";
import { createSupplier } from "@/domain/models/partner/supplier";
import { createEmail, createPhone } from "@/domain/models/partner/contact";
import { createAddress } from "@/domain/models/partner/address";
import { PartnerMapper } from "../mapper/partnerMapper";

export async function createSupplierCommand(
    contactName: string, 
    activity: string,
    businessName?: string, 
    email?: string, 
    phone?: string, 
    address?: AddressDTO,) {
    const supplier = createSupplier(contactName, activity, businessName);

    if(email && email.trim() !== '') supplier.addEmail(createEmail(email, true));
    if(phone && phone.trim() !== '') supplier.addPhone(createPhone(phone, true));
    if(address) supplier.addAddress(createAddress(address.street, address.city, address.zip, address.country, true));

    const store = usePartnersStore();
    await partnerRepository.add(supplier);
    await store.add(PartnerMapper.toDTO(supplier));

    return supplier;
}