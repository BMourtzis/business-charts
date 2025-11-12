import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";

export async function editPartnerCommand(id: string, contactName: string, businessName?: string) {
    const partner = await partnerRepository.getById(id);
    if (!partner) return;
    
    partner.updateData(contactName, businessName);

    const store = usePartnersStore();
    await partnerRepository.update(partner);
    await store.update(PartnerMapper.toDTO(partner));

    return partner;
}

export async function editSupplierCommand(id: string, contactName: string, activity: string, businessName?: string) {
    const supplier = await partnerRepository.getSupplierById(id);
    if (!supplier) return;
    
    supplier.updateData(contactName, businessName, activity);

    const store = usePartnersStore();
    await partnerRepository.update(supplier);
    await store.update(PartnerMapper.toDTO(supplier));

    return supplier;
}

export async function updateDeliveryCarrierCommand(id: string, deliveryCarrierId: string) {
    const b2bCustomer = await partnerRepository.getB2BCustomerById(id);
    if (!b2bCustomer) return;
    
    b2bCustomer.deliverCarrierId = deliveryCarrierId;

    const store = usePartnersStore();
    await partnerRepository.update(b2bCustomer);
    await store.update(PartnerMapper.toDTO(b2bCustomer));

    return b2bCustomer;
}