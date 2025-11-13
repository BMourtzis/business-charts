import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { computed } from "vue";

//TODO: check if this is used

export interface GetPartnerByIdQuery {
    id: string;
}

export class GetPartnerByIdQueryHandler {
    async handle(cmd: GetPartnerByIdQuery) {
        const partner = await partnerRepository.getById(cmd.id);
        if (!partner) return;

        return computed(() => partner);
    }
}