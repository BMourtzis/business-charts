import { v4 as uuidv4 } from "uuid";

export class Address {
    private _id: string;
    
    name?: string;
    isPrimary: boolean;

    street: string;
    city: string;
    zip?: string;
    country?: string;

    constructor(id: string, isPrimary: boolean, street: string, city: string, zip?: string, country?: string, name?: string) {
        this._id = id;
        this.isPrimary = isPrimary,
        this.name = name;

        this.street = street;
        this.city = city;
        this.zip = zip;
        this.country = country;
    }

    get id() { return this._id; }
    
    get value() {
        return[this.street, this.city, this.zip, this.country].join(", ");
    }
}

export function createAddress(street: string, city: string, zip?: string, country?: string, isPrimary = false, name?: string) {
    return new Address(uuidv4(), isPrimary, street, city, zip, country, name);
}