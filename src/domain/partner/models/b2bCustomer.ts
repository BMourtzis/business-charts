import { PartnerType } from "@/domain/partner/partnerTypes";
import { Partner } from "./partner";
import { v4 as uuidv4 } from "uuid";

export class B2BCustomer extends Partner {
    deliverCarrierId: string;

    constructor(id: string, contactName: string, deliveryCarrierId: string, businessName?: string) {
        super(id, PartnerType.B2BCustomer, contactName, businessName);
        this.deliverCarrierId = deliveryCarrierId
    }
}

export function createB2BCustomer(name: string, deliveryCarrierId: string, businessName?: string): Partner {
    return new B2BCustomer(uuidv4(), name, deliveryCarrierId, businessName);
}