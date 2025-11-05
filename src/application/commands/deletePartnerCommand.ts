import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export async function deletePartnerCommand(id: string) {
    const store = usePartnersStore();

    await partnerRepository.remove(id);
    await store.remove(id);
}