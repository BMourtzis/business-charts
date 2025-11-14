import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "./partner/loadPartnersCommand";

export interface DeleteDataCommand {
    removePartners: boolean;
    removeOrders: boolean;
}

export class DeleteDataCommandHandler {
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;

    constructor() {
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
    }

    async handle() {
        await partnerRepository.removeAll();
        await orderRepository.removeAll();

        this._loadPartnersCommandHandler.handle();
    }
}