import { PartnerType } from "../types/partnerTypes";
import { ContactDTO, createEmail, createPhone, type Contact } from "./contact";
import { v4 as uuidv4 } from "uuid";

export interface PartnerDTO {
  id: string
  name: string
  type: PartnerType
  emails: ContactDTO[]
  phones: ContactDTO[]
  addresses: ContactDTO[]
}

export class Partner {
    private _id: string;
    private _emails: Contact[];
    private _phones: Contact[];
    private _addresses: Contact[];
    private _type: PartnerType;

    name: string;

    constructor(id: string, name: string, type: PartnerType) {
        this._id = id;
        this.name = name;
        this._type = type;
        this._emails = [];
        this._phones = [];
        this._addresses = [];
    }

    get id() { return this._id; }
    get type() { return this._type; }
    get emails() { return this._emails.slice(); }
    get phones() { return this._phones.slice(); }
    get addresses() { return this._addresses.slice(); }

    //Emails
    addEmail(email: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryEmail = this._emails.find(e => e.isPrimary === true);
            if(primaryEmail) {
                primaryEmail.isPrimary = false;
            }
        }

        this._emails.push(createEmail(email, isPrimary, name));
    }

    removeEmail(id: string) {
        const emailIndex = this._emails.findIndex(e => e.id === id);

        if(emailIndex == -1) return;

        this._emails.splice(emailIndex, 1);
    }

    //Phones
    addPhone(phone: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryPhone = this._phones.find(p => p.isPrimary === true);
            if(primaryPhone) {
                primaryPhone.isPrimary = false;
            }
        }

        this._phones.push(createPhone(phone, isPrimary, name));
    }

    removePhone(id: string) {
        const phoneIndex = this._phones.findIndex(p => p.id === id);

        if(phoneIndex == -1) return;

        this._phones.splice(phoneIndex, 1);
    }

    //Addresses
    addAddress(address: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryAddress = this._addresses.find(a => a.isPrimary === true);
            if(primaryAddress) {
                primaryAddress.isPrimary = false;
            }
        }

        this._addresses.push(createEmail(address, isPrimary, name));
    }

    removeAddress(id: string) {
        const addressIndex = this._addresses.findIndex(a => a.id === id);

        if(addressIndex == -1) return;

        this._addresses.splice(addressIndex, 1);
    }
}

export function createSupplier(name: string) {
    return new Partner(uuidv4(), name, "supplier");
}

export function createCustomer(name: string) {
    return new Partner(uuidv4(), name, "customer");
}

export function fromPartnerDTO(data: PartnerDTO): Partner {
    const partner = new Partner(data.id, data.name, data.type)
    data.emails.forEach(e => partner.addEmail(e.value, e.isPrimary, e.name))
    data.phones.forEach(p => partner.addPhone(p.value, p.isPrimary, p.name))
    data.addresses.forEach(a => partner.addAddress(a.value, a.isPrimary, a.name))
    return partner
}

export function toPartnerDTO(partner: Partner): PartnerDTO {
    return {
        id: partner.id,
        name: partner.name,
        type: partner.type,
        emails: partner.emails,
        phones: partner.phones,
        addresses: partner.addresses
    }
}

