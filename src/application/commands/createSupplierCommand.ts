import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { createSupplier } from "@/domain/models/partner";
import { Contact } from "@/domain/models/contact";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { toPartnerDTO } from "../mapper/partnerMapper";

export async function createSupplierCommand(
    name: string, 
    emails: Contact[], 
    phones: Contact[], 
    addresses: Contact[], 
    businessName: string, 
    vatNumber?: string) {
    const supplier = createSupplier(name, businessName, vatNumber);

    supplier.setEmails(emails);
    supplier.setPhones(phones);
    supplier.setAddresses(addresses);

    const dto = toPartnerDTO(supplier);
    await partnerRepository.add(supplier);

    const store = usePartnersStore();
    await store.add(dto);

    return supplier;
}