import { PartnerType } from "../../types/partnerTypes";
import { Address, createAddress } from "./address";
import { Contact, createEmail, createPhone } from "./contact";

export class Partner {
    private _id: string;
    private _emails: Contact[];
    private _phones: Contact[];
    private _addresses: Address[];
    private _type: PartnerType;
    private _businessName?: string;
    private _contactName: string;

    constructor(id: string, type: PartnerType, contactName: string, businessName?: string) {
        this._id = id;
        this._contactName = contactName;
        this._businessName = businessName;
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

    get businessName() { return this._businessName || ""; }
    set businessName(value: string) {
        this._businessName = value;
    }

    get contactName() { return this._contactName; }
    set contactName(value: string) {
        this._contactName = value;
    }

    updateData(contactName?: string, businessName?: string) {
        if(contactName &&contactName !== undefined && contactName !== this._contactName) {
            this._contactName = contactName;
        }

        if(businessName !== undefined || businessName !== this._businessName) {
            this._businessName = businessName;
        }
    }

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

    editEmail(emailId: string, newEmail?: string, isPrimary?: boolean, name?: string) {
        const email = this._emails.find(e => e.id === emailId);
        if(!email) return;

        if(newEmail) {
            email.value = newEmail;
        }
        
        if(name != null) {
            email.name = name;
        }

        if (isPrimary !== undefined) {
            if(isPrimary) {
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
    addPhone(phone: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryPhone = this._phones.find(p => p.isPrimary === true);
            if(primaryPhone) {
                primaryPhone.isPrimary = false;
            }
        }

        this._phones.push(createPhone(phone, isPrimary, name));
    }

    editPhone(phoneId: string, newPhone?: string, isPrimary?: boolean, name?: string) {
        const phone = this._phones.find(e => e.id === phoneId);
        if(!phone) return;

        if(newPhone) {
            phone.value = newPhone;
        }
        
        if(name != null) {
            phone.name = name;
        }
        if (isPrimary !== undefined) {
            if(isPrimary) {
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

    //Addresses
    addAddress(street: string, city: string, zip?: string, country?: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryAddress = this._addresses.find(a => a.isPrimary === true);
            if(primaryAddress) {
                primaryAddress.isPrimary = false;
            }
        }

        this._addresses.push(createAddress(street, city, zip, country, isPrimary, name));
    }

    editAddress(addressId: string, newAddress?: Address, isPrimary?: boolean, name?: string) {
        const address = this._addresses.find(e => e.id === addressId);
        if(!address) return;

        if(newAddress) {
            address.street = newAddress.street;
            address.city = newAddress.city;
            address.zip = newAddress.zip;
            address.country = newAddress.country;
        }
        
        if(name != null) {
            address.name = name;
        }
        if (isPrimary !== undefined) {
            if(isPrimary) {
                const primaryAddress = this._addresses.find(e => e.isPrimary === true);
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
        const addressIndex = this._addresses.findIndex(a => a.id === id);

        if(addressIndex == -1) return;

        this._addresses.splice(addressIndex, 1);
    }
}
