import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { createSupplier } from "@/domain/models/partner";
import { Contact } from "@/domain/models/contact";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";

export async function createSupplierCommand(name: string, emails: Contact[], phones: Contact[], addresses: Contact[]) {
    const supplier = createSupplier(name);
    
    supplier.setEmails(emails);
    supplier.setPhones(phones);
    supplier.setAddresses(addresses);

    await partnerRepository.add(supplier);

    const store = usePartnersStore();
    await store.add(supplier);

    return supplier;
}