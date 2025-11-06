import { usePartnersStore } from "../stores/partnerStore";
import { getPartnerById } from "@/application/queries/getPartnerByIdQuery";
import { createSupplierCommand } from "@/application/commands/partner/createSupplierCommand";
import { createCustomerCommand } from "@/application/commands/partner/createCustomerCommand";
import { computed } from "vue";
import { editPartnerCommand } from "@/application/commands/partner/editPartnerCommand";
import { addEmailCommand, editEmailCommand, removeEmailCommand } from "@/application/commands/partner/emailCommands";
import { addPhoneCommand, editPhoneCommand, removePhoneCommand } from "@/application/commands/partner/phoneCommands";
import { addAddressCommand, editAddressCommand, removeAddressCommand } from "@/application/commands/partner/addressCommands";
import { deletePartnerCommand } from "@/application/commands/partner/deletePartnerCommand";

export function usePartners() {
    const store = usePartnersStore();

    return {
        customers: computed(() => store.customers) ,
        suppliers: computed(() => store.suppliers),
        getPartnerById,
        createSupplierCommand,
        createCustomerCommand,
        editPartnerCommand,
        addEmailCommand,
        editEmailCommand,
        removeEmailCommand,
        addPhoneCommand,
        editPhoneCommand,
        removePhoneCommand,
        addAddressCommand,
        editAddressCommand,
        removeAddressCommand,
        deletePartnerCommand
    }
}