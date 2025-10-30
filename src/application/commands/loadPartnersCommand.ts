import { toPartnerDTO } from "@/domain/models/partner";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";


export async function loadPartners() {
    const partners = await partnerRepository.load();
    const store = usePartnersStore();
    store.setPartners(partners.map(partner => toPartnerDTO(partner)));
}