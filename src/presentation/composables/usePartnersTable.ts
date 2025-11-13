import { Address } from "@/domain/models/partner/address";
import { Contact } from "@/domain/models/partner/contact";
import { ContactType } from "@/domain/types/contactTypes";
import { Partner } from "@/domain/models/partner/partner";
import { Supplier } from "@/domain/models/partner/supplier";
import { B2BCustomer } from "@/domain/models/partner/b2bCustomer";
import { computed } from "vue";
import { useLocalizationHelpers } from "./useLocalization";

const { tCap } = useLocalizationHelpers();

function getPrimaryAddress(addresses: Address[]) {
    const addr = addresses.find(a => a.isPrimary && typeof a.value !== 'string');
    return addr?.value as Address | undefined;
}

function getPhones(phones: Contact[]) {
    return phones
        .filter(p => p.type === ContactType.Phone)
        .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
        .slice(0, 3)
        .map(p => p.value as string)
        .join("\n");
}

function toPartnerTable(partner: Partner) {
    const phones = getPhones(partner.phones);
    const address = getPrimaryAddress(partner.addresses);

    return {
        id: partner.id,
        type: partner.type,
        name: partner.businessName
            ? `${partner.businessName} (${partner.contactName})`
            : partner.contactName,
        city: address?.city,
        street: address?.street,
        phones: phones,
        value: partner
    }
}

function toSupplierTable(supplier: Supplier) {
    return {
        ...toPartnerTable(supplier),
        activity: supplier.activity
    };
}

function toB2BCustomerTable(b2bCustomer: B2BCustomer) {
    return {
        ...toPartnerTable(b2bCustomer),
        deliveryCarrier: "",
        deliveryCarrierAddress: ""
    }
}

const partnerHeaders = [
    { title: tCap('common.name'), key: "name" },
    { title: tCap('partner.city'), key: "city" },  
    { title: tCap('partner.street'), key: "street" },  
    { title: tCap('partner.phone', 2), key: "phones" },  
    { title: tCap('common.action', 2), key: "actions"}
];

const supplierHeaders = [
    { title: tCap('common.name'), key: "name" },
    { title: tCap('partner.activity'), key: "activity" },
    { title: tCap('partner.city'), key: "city" },  
    { title: tCap('partner.street'), key: "street" },  
    { title: tCap('partner.phone', 2), key: "phones" },  
    { title: tCap('common.action', 2), key: "actions"}
];

const b2bCustomerHeaders = [
    { title: tCap('common.name'), key: "name" },
    { title: tCap('partner.city'), key: "city" },  
    { title: tCap('partner.street'), key: "street" },  
    { title: tCap('partner.phone', 2), key: "phones" },
    { title: tCap('partner.carrier'), key: "deliveryCarrier" },
    { title: tCap('common.action', 2), key: "actions"}
];

function isSupplierArray(partners: unknown): partners is Supplier[] {
    return Array.isArray(partners) && partners.every(p => p instanceof Supplier);
}

function isB2BCustomerArray(partners: unknown): partners is B2BCustomer[] {
    return Array.isArray(partners) && partners.every(p => p instanceof B2BCustomer);
}

function usePartnerTable(partners: Partner[]) {
    if(isSupplierArray(partners))  {
        return {
            data: computed(() => partners.map(toSupplierTable)),
            headers: supplierHeaders
        };
    }

    if(isB2BCustomerArray(partners)) {
        return {
            data: computed(() => partners.map(toB2BCustomerTable)),
            headers: b2bCustomerHeaders
        };
    }

    return {
        data: computed(() => partners.map(toPartnerTable)),
        headers: partnerHeaders
    };
}

export {
    usePartnerTable
};