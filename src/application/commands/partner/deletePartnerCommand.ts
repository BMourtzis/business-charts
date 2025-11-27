import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export interface DeletePartnerCommand {
    id: string;
}

export class DeletePartnerCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: DeletePartnerCommand) {
        await partnerRepository.remove(cmd.id);
        this._partnersStore.remove(cmd.id);
    }
}