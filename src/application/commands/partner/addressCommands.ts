import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../../mapper/partnerMapper";
import { createAddress } from "@/domain/contact/models/address";

export interface AddPartnerAddressCommand {
    partnerId: string;
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class AddPartnerAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: AddPartnerAddressCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        const address = createAddress(
            cmd.street, 
            cmd.city,
            cmd.zip,
            cmd.country,
            cmd.isPrimary,
            cmd.name
        );
        partner.addAddress(address);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface EditPartnerAddressCommand {
    partnerId: string;
    addressId: string
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class EditPartnerAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditPartnerAddressCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;
        
        const newAddress = createAddress(
            cmd.street, 
            cmd.city,
            cmd.zip,
            cmd.country,
            cmd.isPrimary,
            cmd.name
        );
        partner.editAddress(cmd.addressId, newAddress);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemovePartnerAddressCommand {
    partnerId: string,
    addressId: string
}

export class RemovePartnerAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: RemovePartnerAddressCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeAddress(cmd.addressId);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}