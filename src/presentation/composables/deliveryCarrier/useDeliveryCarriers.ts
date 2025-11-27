import { computed } from "vue";
import { storeToRefs } from "pinia";

import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { AddCarrierAddressCommandHandler, EditCarrierAddressCommandHandler, RemoveCarrierAddressCommandHandler } from "@/application/commands/deliveryCarrier/addressCommands";
import { CreateDeliveryCarrierCommandHandler } from "@/application/commands/deliveryCarrier/createDeliveryCarrierCommand";
import { DeleteDeliveryCarrierCommandHandler } from "@/application/commands/deliveryCarrier/deleteDeliveryCarrierCommand";
import { EditDeliveryCarrierCommandHandler } from "@/application/commands/deliveryCarrier/editDeliveryCarrierCommand";
import { AddCarrierEmailCommandHandler, EditCarrierEmailCommandHandler, RemoveCarrierEmailCommandHandler } from "@/application/commands/deliveryCarrier/emailCommands";
import { AddCarrierPhoneCommandHandler, EditCarrierPhoneCommandHandler, RemoveCarrierPhoneCommandHandler } from "@/application/commands/deliveryCarrier/phoneCommands";


import { useDeliveryCarrierStore } from "@/presentation/stores/deliveryCarrierStore";


export function useDeliveryCarriers() {
    const store = useDeliveryCarrierStore();
    const { all } = storeToRefs(store);

    return {
        carriers: computed(() => all.value
            .map(DeliveryCarrierMapperInstance.toModel)),
        createDeliveryCarrierCommandHandler: new CreateDeliveryCarrierCommandHandler(store),
        editDeliveryCarrierCommandHandler: new EditDeliveryCarrierCommandHandler(store),
        deleteDeliveryCarrierCommandHandler: new DeleteDeliveryCarrierCommandHandler(store),
        addEmailCommandHandler: new AddCarrierEmailCommandHandler(store),
        editEmailCommandHandler: new EditCarrierEmailCommandHandler(store),
        removeEmailCommandHandler: new RemoveCarrierEmailCommandHandler(store),
        addPhoneCommandHandler: new AddCarrierPhoneCommandHandler(store),
        editPhoneCommandHandler: new EditCarrierPhoneCommandHandler(store),
        removePhoneCommandHandler: new RemoveCarrierPhoneCommandHandler(store),
        addAddressCommandHandler: new AddCarrierAddressCommandHandler(store),
        editAddressCommandHandler: new EditCarrierAddressCommandHandler(store),
        removeAddressCommandHandler: new RemoveCarrierAddressCommandHandler(store),
    }
}