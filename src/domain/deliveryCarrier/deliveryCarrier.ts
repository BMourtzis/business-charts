import { Address, createAddress } from "../contact/models/address";
import { v4 as uuidv4 } from "uuid";
import { Contact, createEmail, createPhone } from "../contact/models/contact";
import { IEntity } from "../type";

export class DeliveryCarrier implements IEntity {
    private _id: string;
    private _addresses: Address[];
    private _emails: Contact[];
    private _phones: Contact[];

    name: string;

    constructor(id: string, name: string, addresses: Address[]) {
        this._id = id;
        this.name = name;
        this._addresses = addresses;
        this._emails = [];
        this._phones = [];
    }

    get id() { return this._id; }
    get primaryLocation() { return this._addresses.find(l => l.isPrimary); }
    get addresses() { return this._addresses.slice(); }
    get emails() { return this._emails.slice(); }
    get phones() { return this._phones.slice(); }

    //Address
    addAddress(address: Address) {
        if(address.isPrimary) {
            const primaryAddress = this.addresses.find(a => a.isPrimary === true);
            if(primaryAddress) {
                primaryAddress.isPrimary = false;
            }
        }

        this.addresses.push(createAddress(address.street, address.city, address.zip, address.country, address.isPrimary, address.name));
    }

    editAddress(addressId: string, newAddress: Address) {
        const address = this.addresses.find(e => e.id === addressId);
        if(!address) return;

        if(newAddress) {
            address.street = newAddress.street;
            address.city = newAddress.city;
            address.zip = newAddress.zip;
            address.country = newAddress.country;
            if(newAddress.name) {
                address.name = newAddress.name
            }
        }

        if (newAddress.isPrimary !== undefined) {
            if(newAddress.isPrimary) {
                const primaryAddress = this.addresses.find(e => e.isPrimary === true);
                if(primaryAddress && primaryAddress.id !== addressId) {
                    primaryAddress.isPrimary = false;
                }
                address.isPrimary = true;
            } else {
                address.isPrimary = false;
            }
        }
    }

    setAddresses(addresses: Address[]) {
        this._addresses = addresses.slice();
    }

    removeAddress(id: string) {
        const addressIndex = this.addresses.findIndex(a => a.id === id);

        if(addressIndex == -1) return;

        this.addresses.splice(addressIndex, 1);
    }

    //Emails
    addEmail(email: Contact) {
        if(email.isPrimary) {
            const primaryEmail = this._emails.find(e => e.isPrimary === true);
            if(primaryEmail) {
                primaryEmail.isPrimary = false;
            }
        }

        this._emails.push(createEmail(email.value, email.isPrimary, email.name));
    }

    editEmail(emailId: string, newEmail: Contact) {
        const email = this._emails.find(e => e.id === emailId);
        if(!email) return;

        if(newEmail) {
            email.value = newEmail.value;
            if(newEmail.name != null) {
                email.name = newEmail.name;
            }
        }

        if (newEmail.isPrimary !== undefined) {
            if(newEmail.isPrimary) {
                const primaryEmail = this._emails.find(e => e.isPrimary === true);
                if(primaryEmail && primaryEmail.id !== emailId) {
                    primaryEmail.isPrimary = false;
                }
                email.isPrimary = true;
            } else {
                email.isPrimary = false;
            }
        }
    }

    setEmails(emails: Contact[]) {
        this._emails = emails.slice();
    }

    removeEmail(id: string) {
        const emailIndex = this._emails.findIndex(e => e.id === id);

        if(emailIndex == -1) return;

        this._emails.splice(emailIndex, 1);
    }

    //Phones
    addPhone(phone: Contact) {
        if(phone.isPrimary) {
            const primaryPhone = this._phones.find(p => p.isPrimary === true);
            if(primaryPhone) {
                primaryPhone.isPrimary = false;
            }
        }

        this._phones.push(createPhone(phone.value, phone.isPrimary, phone.name));
    }

    editPhone(phoneId: string, newPhone: Contact) {
        const phone = this._phones.find(e => e.id === phoneId);
        if(!phone) return;

        if(newPhone) {
            phone.value = newPhone.value;
            if(newPhone.name != null) {
                phone.name = newPhone.name;
            }
        }
        
        if (newPhone.isPrimary !== undefined) {
            if(newPhone.isPrimary) {
                const primaryPhone = this._phones.find(e => e.isPrimary === true);
                if(primaryPhone && primaryPhone.id !== phoneId) {
                    primaryPhone.isPrimary = false;
                }
                phone.isPrimary = true;
            } else {
                phone.isPrimary = false;
            }
        }
    }

    setPhones(phones: Contact[]) {
        this._phones = phones.slice();
    }

    removePhone(id: string) {
        const phoneIndex = this._phones.findIndex(p => p.id === id);

        if(phoneIndex == -1) return;

        this._phones.splice(phoneIndex, 1);
    }
}

export function createDeliveryCarrier(name: string, address: Address) {
    return new DeliveryCarrier(uuidv4(), name, [address]);
}