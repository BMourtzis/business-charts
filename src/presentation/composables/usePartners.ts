import { usePartnersStore } from "../stores/partnerStore";
import { GetPartnerByIdQueryHandler } from "@/application/queries/getPartnerByIdQuery";
import { CreateSupplierCommandHandler } from "@/application/commands/createSupplierCommand";
import { CreateB2BCustomerCommandHandler } from "@/application/commands/createCustomerCommand";
import { computed } from "vue";
import { EditPartnerCommandHandler } from "@/application/commands/editPartnerCommand";
import { DeletePartnerCommandHandler } from "@/application/commands/deletePartnerCommand";
import { AddEmailCommandHandler, EditEmailCommandHandler, RemoveEmailCommandHandler } from "@/application/commands/emailCommands";
import { AddPhoneCommandHandler, EditPhoneCommandHandler, RemovePhoneCommandHandler } from "@/application/commands/phoneCommands";
import { AddAddressCommandHandler, EditAddressCommandHandler, RemoveAddressCommandHandler } from "@/application/commands/addressCommands";

export function usePartners() {
    const store = usePartnersStore();

    return {
        customers: computed(() => store.b2bCustomers),
        suppliers: computed(() => store.suppliers),
        getPartnerByIdQueryHandler: new GetPartnerByIdQueryHandler(),
        createSupplierCommandHandler: new CreateSupplierCommandHandler(),
        createB2BCustomerCommandHandler: new CreateB2BCustomerCommandHandler(),
        editPartnerCommandHandler: new EditPartnerCommandHandler(),
        addEmailCommandHandler: new AddEmailCommandHandler(),
        editEmailCommandHandler: new EditEmailCommandHandler(),
        removeEmailCommandHandler: new RemoveEmailCommandHandler(),
        addPhoneCommandHandler: new AddPhoneCommandHandler(),
        editPhoneCommandHandler: new EditPhoneCommandHandler(),
        removePhoneCommandHandler: new RemovePhoneCommandHandler(),
        addAddressCommandHandler: new AddAddressCommandHandler(),
        editAddressCommandHandler: new EditAddressCommandHandler(),
        removeAddressCommandHandler: new RemoveAddressCommandHandler(),
        deletePartnerCommandHandler: new DeletePartnerCommandHandler()
    }
}