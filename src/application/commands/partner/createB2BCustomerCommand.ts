import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { createB2BCustomer } from "@/domain/partner/models/b2bCustomer";
import type { AddressDTO } from "@/application/dto/contactDTO";
import { createEmail, createPhone } from "@/domain/contact/models/contact";
import { createAddress } from "@/domain/contact/models/address";
import { PartnerMapperInstance } from "@/application/mapper/partnerMapper";
import { ClientNumberService } from "@/infrastructure/services/clientNumberService";

export interface CreateB2BCustomerCommand {
    contactName: string;
    deliveryCarrierId: string;
    businessName?: string;
    email?: string;
    phone?: string;
    address?: AddressDTO
}

export class CreateB2BCustomerCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: CreateB2BCustomerCommand) {
        const clientNumber = await ClientNumberService.getNext();

        const customer = createB2BCustomer(cmd.contactName, clientNumber, cmd.deliveryCarrierId, cmd.businessName);
        
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
        this._partnersStore.add(PartnerMapperInstance.toDTO(customer));

        return customer;
    }
}