import { Address, createAddress } from "./address";
import { v4 as uuidv4 } from "uuid";

export class DeliveryCarrier {
    private _id: string;
    private _locations: Address[];

    name: string;

    constructor(id: string, name: string, locations = [] as Address[]) {
        this._id = id;
        this.name = name;
        this._locations = locations;
    }

    get id() { return this._id; }
    get primaryLocation() { return this._locations.find(l => l.isPrimary); }
    get locations() { return this._locations.slice(); }

    addAddress(street: string, city: string, zip?: string, country?: string, isPrimary = false, name?: string) {
        if(isPrimary) {
            const primaryAddress = this.locations.find(a => a.isPrimary === true);
            if(primaryAddress) {
                primaryAddress.isPrimary = false;
            }
        }

        this.locations.push(createAddress(street, city, zip, country, isPrimary, name));
    }

    editAddress(addressId: string, newAddress?: Address, isPrimary?: boolean, name?: string) {
        const address = this.locations.find(e => e.id === addressId);
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
                const primaryAddress = this.locations.find(e => e.isPrimary === true);
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
        this._locations = addresses.slice();
    }

    removeAddress(id: string) {
        const addressIndex = this.locations.findIndex(a => a.id === id);

        if(addressIndex == -1) return;

        this.locations.splice(addressIndex, 1);
    }
}

export function createDeliveryCarrier(name: string) {
    return new DeliveryCarrier(uuidv4(), name);
}