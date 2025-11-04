import { fromPartnerDTO, toPartnerDTO } from "@/domain/models/partner";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export async function editPartnerCommand(id: string, contactName: string, businessName?: string, vatNumber?: string) {
    const store = usePartnersStore();
    const dto = store.getById(id);

    if (!dto) return;

    const partner = fromPartnerDTO(dto);
    
    partner.updateBasicData(contactName, businessName, vatNumber);

    await partnerRepository.update(partner);
    await store.update(toPartnerDTO(partner));

    return partner;
}