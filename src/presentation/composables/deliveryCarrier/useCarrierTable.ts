import { computed, type Ref } from "vue";
import { type DataTableHeader } from "vuetify";

import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { ContactType } from "@/domain/contact/contactTypes";

import { useLocalizationHelpers } from "../useLocalization";

function getCarrierTableHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('common.name'), key: "name", align: 'start', sort: carrierSort },
        { title: tCap('address.city'), key: "city", align: 'start' },  
        { title: tCap('address.street'), key: "address", align: 'start' },  
        { title: tCap('contact.phone', 2), key: "phones", align: 'start' },  
        { title: tCap('common.action', 2), key: "actions", align: 'start' }
    ] satisfies DataTableHeader[];
}

function toTableData(carrier: DeliveryCarrier) {
    const phones = carrier.phones
        .filter(p => p.type === ContactType.Phone)
        .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
        .slice(0, 3);

    return {
        id: carrier.id,
        name: carrier.name,
        city: carrier.primaryLocation?.city ?? "",
        address: carrier.primaryLocation,
        phones,
        value: carrier
    };
}

function filterCarriers(
    carriers: DeliveryCarrier[], 
    filters: CarrierTableFilters
) {
    if(!carriers || carriers.length === 0) return [];

    if(filters.searchTerm) {
        return carriers.filter(c => 
            c.name.toLocaleLowerCase()
                .includes(filters.searchTerm.toLocaleLowerCase()));
    }

    return carriers;
}

function carrierSort(a: string, b: string) {
    return a.localeCompare(b);
}

export function useDeliveryCarrierTable(
    carriersRef: Ref<DeliveryCarrier[] | undefined>,
    filters: Ref<CarrierTableFilters>
) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const carriers = carriersRef.value ?? [];

        const filteredCarriers = filterCarriers(
            carriers, 
            filters.value
        );

        return filteredCarriers.map(toTableData)
    });

    const headers = getCarrierTableHeaders(tCap);

    return {data, headers};
}

export interface CarrierTableFilters {
    searchTerm: string;
}