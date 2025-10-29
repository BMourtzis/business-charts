import { v4 as uuidv4 } from "uuid";

export type ContactType = "phone" | "email" | "address"

export interface ContactDTO {
    id: string
    type: ContactType
    name?: string
    value: string
    isPrimary: boolean
}

export class Contact {
    private _id: string;
    private _type: ContactType;

    name?: string;
    value: string;
    isPrimary: boolean;

    constructor (id: string, isPrimary: boolean, value: string, type: ContactType, name?: string) {
        this._id = id;
        this.name = name;
        this.isPrimary = isPrimary;
        this.value = value;
        this._type = type;
    }

    get id() { return this._id; }
    get type() { return this._type; }
}

export function createEmail(email: string, isPrimary = false, name?: string) {
    return new Contact(uuidv4(), isPrimary, email, "email", name);
}

export function createPhone(phone: string, isPrimary = false, name?: string) {
    return new Contact(uuidv4(), isPrimary, phone, "phone", name);
}

export function createAddress(address: string, isPrimary = false, name?: string) {
    return new Contact(uuidv4(), isPrimary, address, "address", name);
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