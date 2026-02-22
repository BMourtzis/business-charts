import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "./partner/loadPartnersCommand";
import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { LoadDeliveryCarriersCommandHandler } from "./deliveryCarrier/loadDeliveryCarriersCommand";
import { ClearStoresCommandHandler } from "./clearStoresCommand";
import { moneyMovementRepository } from "@/infrastructure/repositories/moneyMovementRepository.local";
import { LoadOrdersCommandHandler } from "./order/loadOrdersCommand";
import { LoadMoneyMovementsCommandHandler } from "./moneyMovement/loadMoneyMovementsCommand";

export interface DeleteDataCommand {
    removePartners: boolean;
    removeOrders: boolean;
    removeCarriers: boolean;
    removeMovements: boolean;
}

export class DeleteDataCommandHandler {
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;
    private _loadOrdersCommandHandler: LoadOrdersCommandHandler;
    private _loadMoneyMovementsCommandHandler: LoadMoneyMovementsCommandHandler;
    private _clearStoresCommandHandler: ClearStoresCommandHandler;

    constructor() {
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
        this._loadOrdersCommandHandler = new LoadOrdersCommandHandler();
        this._loadMoneyMovementsCommandHandler = new LoadMoneyMovementsCommandHandler();
        this._clearStoresCommandHandler = new ClearStoresCommandHandler();
    }

    async handle(cmd: DeleteDataCommand) {
        if(cmd.removePartners) await partnerRepository.removeAll();
        if(cmd.removeCarriers) await deliveryCarrierRepository.removeAll();
        if(cmd.removeOrders) await orderRepository.removeAll();
        if(cmd.removeMovements) await moneyMovementRepository.removeAll();
        
        if(cmd.removePartners) await this._loadPartnersCommandHandler.handle();
        if(cmd.removeCarriers) await this._loadDeliveryCarriesCommandHandler.handle();
        if(cmd.removeOrders) await this._loadOrdersCommandHandler.handle();
        if(cmd.removeMovements) await this._loadMoneyMovementsCommandHandler.handle();

        await this._clearStoresCommandHandler.handle(cmd);
    }
}