import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { createCustomer } from "@/domain/models/partner";
import { Contact } from "@/domain/models/contact";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";

export async function createCustomerCommand(name: string, businessName: string, emails: Contact[], phones: Contact[], addresses: Contact[], vatNumber?: string) {
    const customer = createCustomer(name, businessName, vatNumber);
    
    customer.setEmails(emails);
    customer.setPhones(phones);
    customer.setAddresses(addresses);

    await partnerRepository.add(customer);

    const store = usePartnersStore();
    await store.add(customer);

    return customer;
}