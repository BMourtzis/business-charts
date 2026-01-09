export enum PartnerType {
    Supplier,
    B2BCustomer,
    Contractor,
    RetailCustomer
}

const partnerTypeToStringResource: Record<PartnerType, string> = {
  [PartnerType.Supplier]: "partner.supplier",
  [PartnerType.B2BCustomer]: "partner.b2bCustomer",
  [PartnerType.RetailCustomer]: "partner.customer",
  [PartnerType.Contractor]: "partner.contractor",
};

export function getPartnerTypeStringResource(type: PartnerType) {
    return partnerTypeToStringResource[type];
}