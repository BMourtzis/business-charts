import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "./partner/loadPartnersCommand";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { LoadDeliveryCarriersCommandHandler } from "./deliveryCarrier/loadDeliveryCarriersCommand";
import { ClearStoresCommandHandler } from "./clearStoresCommand";

export interface DeleteDataCommand {
    removePartners: boolean;
    removeOrders: boolean;
    removeCarriers: boolean;
}

export class DeleteDataCommandHandler {
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;
    private _clearStoresCommandHandler: ClearStoresCommandHandler;

    constructor() {
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
        this._clearStoresCommandHandler = new ClearStoresCommandHandler();
    }

    async handle(cmd: DeleteDataCommand) {
        if(cmd.removePartners) await partnerRepository.removeAll();
        if(cmd.removeCarriers) await deliveryCarrierRepository.removeAll();
        if(cmd.removeOrders) await orderRepository.removeAll();
        
        if(cmd.removePartners) await this._loadPartnersCommandHandler.handle();
        if(cmd.removeCarriers) await this._loadDeliveryCarriesCommandHandler.handle();

        await this._clearStoresCommandHandler.handle(cmd);
    }
}