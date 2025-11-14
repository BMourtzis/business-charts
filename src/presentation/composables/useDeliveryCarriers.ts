import { AddCarrierAddressCommandHandler, EditCarrierAddressCommandHandler, RemoveCarrierAddressCommandHandler } from "@/application/commands/deliveryCarrier/addressCommands";
import { useDeliveryCarrierStore } from "../stores/deliveryCarrierStore";
import { AddCarrierEmailCommandHandler, EditCarrierEmailCommandHandler, RemoveCarrierEmailCommandHandler } from "@/application/commands/deliveryCarrier/emailCommands";
import { AddCarrierPhoneCommandHandler, EditCarrierPhoneCommandHandler, RemoveCarrierPhoneCommandHandler } from "@/application/commands/deliveryCarrier/phoneCommands";

export function useDeliveryCarriers() {
    const store = useDeliveryCarrierStore();

    return {
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