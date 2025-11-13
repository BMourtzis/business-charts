import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export interface DeletePartnerCommand {
    id: string;
}

export class DeletePartnerCommandHandler {
    async handle(cmd: DeletePartnerCommand) {
        const store = usePartnersStore();

        await partnerRepository.remove(cmd.id);
        await store.remove(cmd.id);
    }
}