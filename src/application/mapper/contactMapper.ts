import { Contact } from "@/domain/contact/models/contact";
import { AddressDTO, ContactDTO } from "../dto/contactDTO";
import { Address } from "@/domain/contact/models/address";
import { IMapper } from "./type";

export class ContactMapper implements IMapper<Contact, ContactDTO> {
    toModel(dto: ContactDTO): Contact {
        return new Contact(dto.id, dto.isPrimary, dto.value, dto.type, dto.name);
    }

    toDTO(model: Contact): ContactDTO {
        return {
            id: model.id,
            type: model.type,
            name: model.name,
            value: model.value,
            isPrimary: model.isPrimary
        };
    }
}

export class AddressMapper implements IMapper<Address, AddressDTO> {
    toModel(dto: AddressDTO): Address {
        return new Address(dto.id, dto.isPrimary, dto.street, dto.city, dto.zip, dto.country, dto.name);
    }

    toDTO(model: Address): AddressDTO {
        return {
            id: model.id,
            name: model.name,
            isPrimary: model.isPrimary,
            street: model.street,
            city: model.city,
            zip: model.zip,
            country: model.country
        };
    }
}

export const ContactMapperInstance = new ContactMapper();
export const AddressMapperInstance = new AddressMapper();