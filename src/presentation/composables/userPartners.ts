import { loadPartners } from "@/application/commands/loadPartnersCommand";
import { usePartnersStore } from "../stores/partnerStore";
import { createCustomer, createSupplier } from "@/domain/models/partner";
import { getPartnerById } from "@/application/queries/getPartnerByIdQuery";

export function userPartners() {
    const store = usePartnersStore();

    async function init() {
        await loadPartners();
    }

    return {
        partners: store.partners,
        init,
        createSupplier,
        createCustomer,
        getPartnerById
    }
}