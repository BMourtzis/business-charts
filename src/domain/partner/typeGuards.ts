import { B2BCustomer } from "./models/b2bCustomer";
import { Partner } from "./models/partner";
import { Supplier } from "./models/supplier";
import { PartnerType } from "./partnerTypes";

export function isSupplier(p: Partner): p is Supplier {
    return p.type === PartnerType.Supplier;
}

export function isB2BCustomer(p: Partner): p is B2BCustomer {
    return p.type === PartnerType.B2BCustomer;
}