import { loadPartners } from "@/application/commands/loadPartnersCommand";
import { usePartnersStore } from "../stores/partnerStore";
import { getPartnerById } from "@/application/queries/getPartnerByIdQuery";
import { createSupplierCommand } from "@/application/commands/createSupplierCommand";
import { createCustomerCommand } from "@/application/commands/createCustomerCommand";
import { computed } from "vue";

export function usePartners() {
    const store = usePartnersStore();

    async function init() {
        await loadPartners();
    }

    return {
        customers: computed(() => store.customers) ,
        suppliers: computed(() => store.suppliers),
        init,
        createSupplierCommand,
        createCustomerCommand,
        getPartnerById
    }
}