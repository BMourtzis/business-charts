import { type IEntity } from "@/domain/type";
import { isNullOrEmpty } from "@/utlis/stringUtils";
import { v4 as uuidv4 } from "uuid";

export class Address implements IEntity {
    readonly id: string;
    
    name?: string;
    isPrimary: boolean;

    street?: string;
    city?: string;
    zip?: string;
    country?: string;

    constructor(id: string, isPrimary: boolean, street?: string, city?: string, zip?: string, country?: string, name?: string) {
        assertAddressDetails(street, city, zip, country);

        this.id = id;
        this.isPrimary = isPrimary,
        this.name = name;
        this.street = street;
        this.city = city;
        this.zip = zip;
        this.country = country;
    }
    
    get value() {
        return[this.street, this.city, this.zip, this.country]
            .filter(s => s !== null && s !== "")
            .join(", ");
    }
}

function assertAddressDetails(street?: string, city?: string, zip?: string, country?: string) {
    if(isNullOrEmpty(street)
        && isNullOrEmpty(city)
        && isNullOrEmpty(zip)
        && isNullOrEmpty(country)
    ) {
        throw new Error("An address needs to have at least one of the following: street, city, zip or country");
    }
}

export function createAddress(street?: string, city?: string, zip?: string, country?: string, isPrimary = false, name?: string) {
    return new Address(uuidv4(), isPrimary, street, city, zip, country, name);
}