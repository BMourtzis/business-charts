import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import { LoadOrdersCommandHandler } from "./order/loadOrdersCommand";

export class LoadAllDataCommandHandler {
    constructor(
        private loadPartnersCommandHanlder: LoadPartnersCommandHandler,
        private loadDeliveryCarriersCommandHanlder: LoadDeliveryCarriersCommandHandler,
        private loadOrdersCommandHandler: LoadOrdersCommandHandler
    ) {}

    async handle() {
        await this.loadDeliveryCarriersCommandHanlder.handle();
        await this.loadPartnersCommandHanlder.handle();
        await this.loadOrdersCommandHandler.handle();
    }
}