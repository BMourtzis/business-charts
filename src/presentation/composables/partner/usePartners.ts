import { computed } from "vue";
import { storeToRefs } from "pinia";

import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import { Supplier } from "@/domain/partner/models/supplier";

import { PartnerType } from "@/domain/partner/partnerTypes";
import { PartnerMapperInstance } from "@/application/mapper/partnerMapper";

import { CreateSupplierCommandHandler } from "@/application/commands/partner/createSupplierCommand";
import { CreateB2BCustomerCommandHandler } from "@/application/commands/partner/createB2BCustomerCommand";
import { EditB2BCustomerCommandHandler, EditPartnerCommandHandler, EditSupplierCommandHandler } from "@/application/commands/partner/editPartnerCommand";
import { DeletePartnerCommandHandler } from "@/application/commands/partner/deletePartnerCommand";
import { AddPartnerEmailCommandHandler, EditPartnerEmailCommandHandler, RemovePartnerEmailCommandHandler } from "@/application/commands/partner/emailCommands";
import { AddPartnerPhoneCommandHandler, EditPartnerPhoneCommandHandler, RemovePartnerPhoneCommandHandler } from "@/application/commands/partner/phoneCommands";
import { AddPartnerAddressCommandHandler, EditPartnerAddressCommandHandler, RemovePartnerAddressCommandHandler } from "@/application/commands/partner/addressCommands";

import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { isNullOrEmpty } from "@/utlis/stringUtils";
import { useLocalizationHelpers } from "../useLocalization";
import type { PartnerDTO } from "@/application/dto/partnerDTO";


export function usePartners() {
    const store = usePartnersStore();
    const { all } = storeToRefs(store);

    const { tCap } = useLocalizationHelpers();

    return {
        b2bCustomers: computed(() => all.value
            .filter(p => p.type === PartnerType.B2BCustomer)
            .map(PartnerMapperInstance.toModel) as B2BCustomer[]),
        suppliers: computed(() => all.value
            .filter(p => p.type === PartnerType.Supplier)
            .map(PartnerMapperInstance.toModel) as Supplier[]),
        partners: computed(() => all.value),
        partnersToItemProps: getPartnersToItemProps(tCap),
        //Commands
        createSupplierCommandHandler: new CreateSupplierCommandHandler(store),
        createB2BCustomerCommandHandler: new CreateB2BCustomerCommandHandler(store),
        editSupplierCommandHandler: new EditSupplierCommandHandler(store),
        editB2BCustomerCommandHandler: new EditB2BCustomerCommandHandler(store),
        editPartnerCommandHandler: new EditPartnerCommandHandler(store),
        addEmailCommandHandler: new AddPartnerEmailCommandHandler(store),
        editEmailCommandHandler: new EditPartnerEmailCommandHandler(store),
        removeEmailCommandHandler: new RemovePartnerEmailCommandHandler(store),
        addPhoneCommandHandler: new AddPartnerPhoneCommandHandler(store),
        editPhoneCommandHandler: new EditPartnerPhoneCommandHandler(store),
        removePhoneCommandHandler: new RemovePartnerPhoneCommandHandler(store),
        addAddressCommandHandler: new AddPartnerAddressCommandHandler(store),
        editAddressCommandHandler: new EditPartnerAddressCommandHandler(store),
        removeAddressCommandHandler: new RemovePartnerAddressCommandHandler(store),
        deletePartnerCommandHandler: new DeletePartnerCommandHandler(store)
    }
}

function getPartnersToItemProps(tCap: (key: string) => string) {
    return (item: PartnerDTO) => {
        if(!item) return;

        return {
            title: item.businessName || item.contactName,
            value: item.id,
            subtitle: tCap(getPartnerTypeStringResource(item.type))
        };
    }
}

function getPartnerTypeStringResource(type: PartnerType) {
    return partnerTypeToStringResource[type];
}

const partnerTypeToStringResource: Record<PartnerType, string> = {
  [PartnerType.Supplier]: "partner.supplier",
  [PartnerType.B2BCustomer]: "partner.b2bCustomer",
  [PartnerType.RetailCustomer]: "partner.customer",
  [PartnerType.Contractor]: "partner.contractor",
};



export function getAddressFromFields(street?: string, city?: string, zip?: string, country?: string) {
  if(isNullOrEmpty(street)
    && isNullOrEmpty(city)
    && isNullOrEmpty(zip)
    && isNullOrEmpty(country)
  ) return undefined;
  
  return {
    id: "",
    isPrimary: true,
    street: street,
    city: city,
    zip: zip,
    country: country
  };
}