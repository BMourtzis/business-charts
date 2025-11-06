import { Partner } from "@/domain/models/partner";
import { PartnerDTO } from "../dto/partnerDTO";
import { Contact } from "@/domain/models/contact";
import { ContactDTO } from "../dto/contactDTO";

export function fromPartnerDTO(data: PartnerDTO): Partner {
    const partner = new Partner(data.id, data.contactName, data.type, data.businessName, data.vatNumber);
    partner.setEmails(data.emails.map(e => new Contact(e.id, e.isPrimary, e.value, "email", e.name)));
    partner.setPhones(data.phones.map(p => new Contact(p.id, p.isPrimary, p.value, "phone", p.name)));
    partner.setAddresses(data.addresses.map(a => new Contact(a.id, a.isPrimary, a.value, "address", a.name)));
    return partner;
}

export function toPartnerDTO(partner: Partner): PartnerDTO {
    return {
        id: partner.id,
        businessName: partner.businessName,
        vatNumber: partner.vatNumber,
        contactName: partner.contactName,
        type: partner.type,
        emails: partner.emails.map(toContactDTO),
        phones: partner.phones.map(toContactDTO),
        addresses: partner.addresses.map(toContactDTO)
    }
}

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