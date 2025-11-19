import { LoadDeliveryCarriersCommandHandler } from "../commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "../commands/partner/loadPartnersCommand";


export async function initApplication() {
    await Promise.all([
        new LoadPartnersCommandHandler().handle(),
        new LoadDeliveryCarriersCommandHandler().handle()
    ]);
}