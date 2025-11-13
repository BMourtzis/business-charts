import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "./loadPartnersCommand";

export interface DeleteAllDataCommand {
    removePartners: boolean;
    removeOrders: boolean;
}

export class DeleteAllDataCommandHandler {
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