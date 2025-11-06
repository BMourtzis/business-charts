import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { createSupplier } from "@/domain/models/partner";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { toPartnerDTO } from "../../mapper/partnerMapper";

export async function createSupplierCommand(
    name: string, 
    businessName: string, 
    vatNumber?: string,
    email?: string, 
    phone?: string, 
    address?: string,) {
    const supplier = createSupplier(name, businessName, vatNumber);

    if(email && email.trim() !== '') supplier.addEmail(email, true);
    if(phone && phone.trim() !== '') supplier.addPhone(phone, true);
    if(address && address.trim() !== '') supplier.addAddress(address, true);

    const dto = toPartnerDTO(supplier);
    await partnerRepository.add(supplier);

    const store = usePartnersStore();
    await store.add(dto);

    return supplier;
}