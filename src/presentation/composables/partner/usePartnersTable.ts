import { computed, Ref } from "vue";
import type { DataTableHeader } from 'vuetify';

import { Address } from "@/domain/contact/models/address";
import { ContactType } from "@/domain/contact/contactTypes";
import { Partner } from "@/domain/partner/models/partner";
import { Supplier } from "@/domain/partner/models/supplier";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { Contact } from "@/domain/contact/models/contact";

import { useLocalizationHelpers } from "@/presentation/composables/useLocalization";
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";
import { PartnerType } from "@/domain/partner/partnerTypes";
import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";

function getPrimaryAddress(addresses: Address[]) {
    return addresses.find(a => a.isPrimary);
}

function getPhones(phones: Contact[]) {
    return phones
        .filter(p => p.type === ContactType.Phone)
        .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
        .slice(0, 3);
}

function toPartnerTable(partner: Partner): PartnerTableRow {
    const phones = getPhones(partner.phones);
    const address = getPrimaryAddress(partner.addresses);

    return {
        id: partner.id,
        clientNumber: partner.clientNumber,
        type: partner.type,
        name: partner.businessName
            ? `${partner.businessName} (${partner.contactName})`
            : partner.contactName,
        city: address?.city,
        address,
        phones,
        rowType: "partner",
        value: partner
    }
}

function toSupplierTable(supplier: Supplier): SupplierTableRow {
    return {
        ...toPartnerTable(supplier),
        activity: supplier.activity,
        rowType: "supplier"
    };
}

function toB2BCustomerTable(b2bCustomer: B2BCustomer): B2BCustomerTableRow {
    return {
        ...toPartnerTable(b2bCustomer),
        deliveryCarrier: getCarrierDetails(b2bCustomer.deliveryCarrierId),
        rowType: "b2b"
    }
}

function getPartnerHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('common.name'), key: "name", align: 'start' },
        { title: tCap('partner.clientNumber'), key: "clientNumber", align: 'start' },
        { title: tCap('address.city'), key: "city", align: 'start' },  
        { title: tCap('address.street'), key: "address", align: 'start' },  
        { title: tCap('contact.phone', 2), key: "phones", align: 'start' },  
        { title: tCap('common.action', 2), key: "actions", align: 'start' }
    ] satisfies DataTableHeader[];
}

function getSupplierHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('common.name'), key: "name", align: 'start' },
        { title: tCap('partner.clientNumber'), key: "clientNumber", align: 'start' },
        { title: tCap('partner.activity'), key: "activity", align: 'start' },
        { title: tCap('address.city'), key: "city", align: 'start' },  
        { title: tCap('address.street'), key: "address", align: 'start' },  
        { title: tCap('contact.phone', 2), key: "phones", align: 'start' },  
        { title: tCap('common.action', 2), key: "actions", align: 'start' }
    ] satisfies DataTableHeader[];
}

function getB2BCustomerHeader(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('common.name'), key: "name", align: 'start' },
        { title: tCap('partner.clientNumber'), key: "clientNumber", align: 'start' },
        { title: tCap('address.city'), key: "city", align: 'start' },  
        { title: tCap('address.street'), key: "address", align: 'start' },  
        { title: tCap('contact.phone', 2), key: "phones", align: 'start' },
        { title: tCap('deliveryCarrier.carrier'), key: "deliveryCarrier", align: 'start' },
        { title: tCap('common.action', 2), key: "actions", align: 'start'}
    ] satisfies DataTableHeader[];
}

function isSupplierArray(partners: unknown): partners is Supplier[] {
    return Array.isArray(partners) && partners.every(p => p instanceof Supplier);
}

function isB2BCustomerArray(partners: unknown): partners is B2BCustomer[] {
    return Array.isArray(partners) && partners.every(p => p instanceof B2BCustomer);
}

export function usePartnerTable(partnersRef: Ref<Partner[] | undefined>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const partners = partnersRef.value ?? [];

        if (isSupplierArray(partners)) return partners.map(toSupplierTable);
        if (isB2BCustomerArray(partners)) return partners.map(toB2BCustomerTable);
        return partners.map(toPartnerTable);
    });

    const headers = computed(() => {
        const partners = partnersRef.value ?? [];

        if (isSupplierArray(partners)) return getSupplierHeaders(tCap);
        if (isB2BCustomerArray(partners)) return getB2BCustomerHeader(tCap);
        return getPartnerHeaders(tCap);
    });

    return { data, headers };
}

export type PartnerRowType = "partner" | "supplier" | "b2b";

interface BasePartnerRow {
    rowType: PartnerRowType,
    id: string;
    clientNumber: number,
    type: PartnerType,
    name: string;
    city?: string;
    address?: Address;
    phones: Contact[],
    value: Partner
}

export interface PartnerTableRow extends BasePartnerRow {
    rowType: "partner";
}

export interface SupplierTableRow extends BasePartnerRow {
    rowType: "supplier";
    activity: string;
}

export interface B2BCustomerTableRow extends BasePartnerRow {
    rowType: "b2b";
    deliveryCarrier?: DeliveryCarrier
}

export type PartnerTableRowAny =
  | PartnerTableRow
  | SupplierTableRow
  | B2BCustomerTableRow;