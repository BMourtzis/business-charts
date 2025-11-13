import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";
import { createAddress } from "@/domain/models/partner/address";

export interface AddAddressCommand {
    partnerId: string;
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class AddAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: AddAddressCommand) {
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

export interface EditAddressCommand {
    partnerId: string;
    addressId: string
    street: string;
    city: string;
    zip?: string;
    country?: string;
    name?: string;
    isPrimary?: boolean
}

export class EditAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditAddressCommand) {
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

export interface RemoveAddressCommand {
    partnerId: string,
    addressId: string
}

export class RemoveAddressCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: RemoveAddressCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeAddress(cmd.addressId);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}