import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { AddressDTO } from "@/application/dto/contactDTO";
import { createSupplier } from "@/domain/partner/models/supplier";
import { createEmail, createPhone } from "@/domain/contact/models/contact";
import { createAddress } from "@/domain/contact/models/address";
import { PartnerMapper } from "@/application/mapper/partnerMapper";

export interface CreateSupplierCommand {
    contactName: string, 
    activity: string,
    businessName?: string, 
    email?: string, 
    phone?: string, 
    address?: AddressDTO
}

//TODO: to fully decouple the cmd from the store, createa an adapter.
export class CreateSupplierCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: CreateSupplierCommand) {
        const supplier = createSupplier(
            cmd.contactName, 
            cmd.activity, 
            cmd.businessName);

        if(cmd.email && cmd.email.trim() !== '') supplier.addEmail(createEmail(cmd.email, true));
        if(cmd.phone && cmd.phone.trim() !== '') supplier.addPhone(createPhone(cmd.phone, true));
        if(cmd.address) supplier.addAddress(createAddress(
            cmd.address.street, 
            cmd.address.city, 
            cmd.address.zip, 
            cmd.address.country, 
            true));
        
        await partnerRepository.add(supplier);
        this._partnersStore.add(PartnerMapper.toDTO(supplier));

        return supplier;
    }
}