import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";

export class LoadAllDataCommandHandler {
    constructor(
        private loadPartnersCommandHanlder: LoadPartnersCommandHandler,
        private loadDeliveryCarriersCommandHanlder: LoadDeliveryCarriersCommandHandler
    ) {}

    async handle() {
        await this.loadDeliveryCarriersCommandHanlder.handle();
        await this.loadPartnersCommandHanlder.handle();
    }
}