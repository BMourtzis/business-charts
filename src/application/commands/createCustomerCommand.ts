import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { createCustomer } from "@/domain/models/partner";
import { Contact } from "@/domain/models/contact";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";

export async function createCustomerCommand(name: string, emails: Contact[], phones: Contact[], addresses: Contact[]) {
    const customer = createCustomer(name);
    
    customer.setEmails(emails);
    customer.setPhones(phones);
    customer.setAddresses(addresses);

    await partnerRepository.add(customer);

    const store = usePartnersStore();
    await store.add(customer);

    return customer;
}