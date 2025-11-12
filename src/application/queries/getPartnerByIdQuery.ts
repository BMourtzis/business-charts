import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { computed } from "vue";

//TODO: check if this is used
export async function getPartnerById(id: string) {
    const partner = await partnerRepository.getById(id);
    if (!partner) return;

    return computed(() => partner);
}