import { PartnerType } from "@/domain/partner/partnerTypes";
import { Partner } from "./partner";
import { v4 as uuidv4 } from "uuid";

export class B2BCustomer extends Partner {
    deliveryCarrierId?: string;

    constructor(
        id: string, 
        businessName: string, 
        clientNumber: number,
        tin?: string, 
        deliveryCarrierId?: string, 
        contactName?: string,
        
    ) {
        super(id, PartnerType.B2BCustomer, clientNumber, businessName, contactName, tin);
        this.deliveryCarrierId = deliveryCarrierId
    }
}

export function createB2BCustomer(
    businessName: string, 
    clientNumber: number,
    tin: string, 
    deliveryCarrierId?: string, 
    contactName?: string,
): B2BCustomer {
    return new B2BCustomer(
        uuidv4(), 
        businessName, 
        clientNumber, 
        tin,
        deliveryCarrierId, 
        contactName
    );
}