import { v4 as uuidv4 } from "uuid";
import { ContactType } from "../contactTypes";
import { type IEntity } from "@/domain/type";

export class Contact implements IEntity {
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
    return new Contact(uuidv4(), isPrimary, email, ContactType.Email, name);
}

export function createPhone(phone: string, isPrimary = false, name?: string) {
    return new Contact(uuidv4(), isPrimary, phone, ContactType.Phone, name);
}

