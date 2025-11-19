import { ContactType } from "@/domain/contact/contactTypes"

export interface ContactDTO {
    id: string;
    type: ContactType;
    name?: string;
    value: string;
    isPrimary: boolean;
}

export interface AddressDTO {
    id: string;
    name?: string;
    isPrimary: boolean;
    street: string;
    city: string;
    zip?: string;
    country?: string;
}