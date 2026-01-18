import { ContactType } from "@/domain/contact/contactTypes"
import type { IEntityDTO } from "./type";

export interface ContactDTO extends IEntityDTO {
    id: string;
    type: ContactType;
    name?: string;
    value: string;
    isPrimary: boolean;
}

export interface AddressDTO extends IEntityDTO {
    id: string;
    name?: string;
    isPrimary: boolean;
    street: string;
    city: string;
    zip?: string;
    country?: string;
}