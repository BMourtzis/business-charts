import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { createB2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { AddressDTO } from "../dto/contactDTO";
import { createEmail, createPhone } from "@/domain/contact/models/contact";
import { createAddress } from "@/domain/contact/models/address";
import { PartnerMapper } from "../mapper/partnerMapper";

export interface CreateB2BCustomerCommand {
    name: string;
    deliveryCarrierId: string;
    businessName?: string;
    email: string;
    phone: string;
    address: AddressDTO
}

export class CreateB2BCustomerCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: CreateB2BCustomerCommand) {
        const customer = createB2BCustomer(cmd.name, cmd.deliveryCarrierId, cmd.businessName);
        
        if(cmd.email && cmd.email.trim() != '') customer.addEmail(createEmail(cmd.email, true));
        if(cmd.phone && cmd.phone.trim() != '') customer.addPhone(createPhone(cmd.phone, true));
        if(cmd.address) customer.addAddress(createAddress(
            cmd.address.street, 
            cmd.address.city, 
            cmd.address.zip, 
            cmd.address.country, 
            true
        ));

        await partnerRepository.add(customer);
        this._partnersStore.add(PartnerMapper.toDTO(customer));

        return customer;
    }
}