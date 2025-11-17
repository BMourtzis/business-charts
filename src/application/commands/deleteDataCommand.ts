import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "./partner/loadPartnersCommand";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { LoadDeliveryCarriersCommandHandler } from "./deliveryCarrier/loadDeliveryCarriersCommand";

export interface DeleteDataCommand {
    removePartners: boolean;
    removeOrders: boolean;
}

export class DeleteDataCommandHandler {
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;

    constructor() {
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
    }

    async handle() {
        await partnerRepository.removeAll();
        await orderRepository.removeAll();
        await deliveryCarrierRepository.removeAll();

        this._loadPartnersCommandHandler.handle();
        this._loadDeliveryCarriesCommandHandler.handle();
    }
}