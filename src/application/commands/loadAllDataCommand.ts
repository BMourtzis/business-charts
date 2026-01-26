import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import { LoadOrdersCommandHandler } from "./order/loadOrdersCommand";
import type { LoadMoneyMovementsCommandHandler } from "./moneyMovement/loadMoneyMovementsCommand";

export class LoadAllDataCommandHandler {
    constructor(
        private loadPartnersCommandHanlder: LoadPartnersCommandHandler,
        private loadDeliveryCarriersCommandHanlder: LoadDeliveryCarriersCommandHandler,
        private loadOrdersCommandHandler: LoadOrdersCommandHandler,
        private loadMoneyMovementCommandHandler: LoadMoneyMovementsCommandHandler
    ) {}

    async handle() {
        await this.loadDeliveryCarriersCommandHanlder.handle();
        await this.loadPartnersCommandHanlder.handle();
        await this.loadOrdersCommandHandler.handle();
        await this.loadMoneyMovementCommandHandler.handle();
    }
}