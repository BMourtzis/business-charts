import { PartnerMapperInstance } from "@/application/mapper/partnerMapper";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";

export class LoadPartnersCommandHandler{
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle() {
        const partners = await partnerRepository.load();
        this._partnersStore.setPartners(partners.map(PartnerMapperInstance.toDTO));
    }
}