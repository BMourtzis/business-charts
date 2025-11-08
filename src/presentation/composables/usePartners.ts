import { usePartnersStore } from "../stores/partnerStore";
import { getPartnerById } from "@/application/queries/getPartnerByIdQuery";
import { createSupplierCommand } from "@/application/commands/createSupplierCommand";
import { createCustomerCommand } from "@/application/commands/createCustomerCommand";
import { computed } from "vue";
import { editPartnerCommand } from "@/application/commands/editPartnerCommand";
import { addEmailCommand, editEmailCommand, removeEmailCommand } from "@/application/commands/emailCommands";
import { addPhoneCommand, editPhoneCommand, removePhoneCommand } from "@/application/commands/phoneCommands";
import { addAddressCommand, editAddressCommand, removeAddressCommand } from "@/application/commands/addressCommands";
import { deletePartnerCommand } from "@/application/commands/deletePartnerCommand";

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