import { Contact } from "@/domain/models/partner/contact";
import { AddressDTO, ContactDTO } from "../dto/contactDTO";
import { Address } from "@/domain/models/partner/address";

export class ContactMapper {
    static toModel(dto: ContactDTO): Contact {
        return new Contact(dto.id, dto.isPrimary, dto.value, dto.type, dto.name);
    }

    static toDto(model: Contact): ContactDTO {
        return {
            id: model.id,
            type: model.type,
            name: model.name,
            value: model.value,
            isPrimary: model.isPrimary
        };
    }
}

export class AddressMapper {
    static toModel(dto: AddressDTO): Address {
        return new Address(dto.id, dto.isPrimary, dto.street, dto.city, dto.zip, dto.country, dto.name);
    }

    static toDto(model: Address): AddressDTO {
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