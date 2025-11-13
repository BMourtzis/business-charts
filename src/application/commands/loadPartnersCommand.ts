import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export class LoadPartnersCommandHandler{
    async handle() {
        const partners = await partnerRepository.load();
        const store = usePartnersStore();
        store.setPartners(partners);
    }
}