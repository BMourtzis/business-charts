import { computed } from "vue";
import { storeToRefs } from "pinia";

import { B2BCustomer } from "@/domain/models/partner/b2bCustomer";
import { Supplier } from "@/domain/models/partner/supplier";

import { PartnerType } from "@/domain/types/partnerTypes";
import { PartnerMapper } from "@/application/mapper/partnerMapper";

import { GetPartnerByIdQueryHandler } from "@/application/queries/getPartnerByIdQuery";
import { CreateSupplierCommandHandler } from "@/application/commands/createSupplierCommand";
import { CreateB2BCustomerCommandHandler } from "@/application/commands/createCustomerCommand";
import { EditPartnerCommandHandler } from "@/application/commands/editPartnerCommand";
import { DeletePartnerCommandHandler } from "@/application/commands/deletePartnerCommand";
import { AddEmailCommandHandler, EditEmailCommandHandler, RemoveEmailCommandHandler } from "@/application/commands/emailCommands";
import { AddPhoneCommandHandler, EditPhoneCommandHandler, RemovePhoneCommandHandler } from "@/application/commands/phoneCommands";
import { AddAddressCommandHandler, EditAddressCommandHandler, RemoveAddressCommandHandler } from "@/application/commands/addressCommands";

import { usePartnersStore } from "../stores/partnerStore";


export function usePartners() {
    const store = usePartnersStore();
    const { all } = storeToRefs(store);

    return {
        b2bCustomers: computed(() => all.value
            .filter(p => p.type === PartnerType.B2BCustomer)
            .map(PartnerMapper.toModel) as B2BCustomer[]),
        suppliers: computed(() => all.value
            .filter(p => p.type === PartnerType.Supplier)
            .map(PartnerMapper.toModel) as Supplier[]),
        getPartnerByIdQueryHandler: new GetPartnerByIdQueryHandler(),
        createSupplierCommandHandler: new CreateSupplierCommandHandler(store),
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