import { Contact } from "@/domain/models/contact";
import { ContactDTO } from "../dto/contactDTO";

export function toContactDTO(contact: Contact): ContactDTO {
    return {
        id: contact.id,
        type: contact.type,
        name: contact.name,
        value: contact.value,
        isPrimary: contact.isPrimary
    };
}

export function fromContactDTO(dto: ContactDTO): Contact {
    return new Contact(dto.id, dto.isPrimary, dto.value, dto.type, dto.name);
}