import { computed } from "vue";
import { storeToRefs } from "pinia";

import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { Supplier } from "@/domain/partner/models/supplier";

import { PartnerType } from "@/domain/partner/partnerTypes";
import { PartnerMapper } from "@/application/mapper/partnerMapper";

import { CreateSupplierCommandHandler } from "@/application/commands/createSupplierCommand";
import { CreateB2BCustomerCommandHandler } from "@/application/commands/createCustomerCommand";
import { EditPartnerCommandHandler, EditSupplierCommandHandler } from "@/application/commands/editPartnerCommand";
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
        createSupplierCommandHandler: new CreateSupplierCommandHandler(store),
        createB2BCustomerCommandHandler: new CreateB2BCustomerCommandHandler(store),
        editSupplierCommandHandler: new EditSupplierCommandHandler(store),
        editPartnerCommandHandler: new EditPartnerCommandHandler(store),
        addEmailCommandHandler: new AddEmailCommandHandler(store),
        editEmailCommandHandler: new EditEmailCommandHandler(store),
        removeEmailCommandHandler: new RemoveEmailCommandHandler(store),
        addPhoneCommandHandler: new AddPhoneCommandHandler(store),
        editPhoneCommandHandler: new EditPhoneCommandHandler(store),
        removePhoneCommandHandler: new RemovePhoneCommandHandler(store),
        addAddressCommandHandler: new AddAddressCommandHandler(store),
        editAddressCommandHandler: new EditAddressCommandHandler(store),
        removeAddressCommandHandler: new RemoveAddressCommandHandler(store),
        deletePartnerCommandHandler: new DeletePartnerCommandHandler(store)
    }
}