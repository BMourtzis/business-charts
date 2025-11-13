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

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

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

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface RemoveAddressCommand {
    partnerId: string,
    addressId: string
}

export class RemoveAddressCommandHandler {
    async handle(cmd: RemoveAddressCommand) {
        const partner = await partnerRepository.getById(cmd.partnerId);
        if (!partner) return;

        partner.removeAddress(cmd.addressId);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}