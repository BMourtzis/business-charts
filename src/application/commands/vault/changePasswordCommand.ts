import * as cryptoSession from "@/infrastructure/security/crypto-session";

import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { LoadPartnersCommandHandler } from "../partner/loadPartnersCommand";
import { LoadDeliveryCarriersCommandHandler } from "../deliveryCarrier/loadDeliveryCarriersCommand";
import { PartnerDTO } from "@/application/dto/partnerDTO";
import { DeliveryCarrierDTO } from "@/application/dto/deliveryCarrierDTO";

export interface ChangePasswordCommand {
    oldPassword: string;
    newPassword: string
}

type AllData = {
    partners: PartnerDTO[],
    carriers: DeliveryCarrierDTO[]
}

export class ChangePasswordCommandHandler {
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;

    constructor() {
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
    }
    
    async handle(cmd: ChangePasswordCommand) {
        await this.validateOldPassword(cmd.oldPassword);
        const allData = await this.pullAllData();
        // await this.deleteAllData();
        cryptoSession.createNewSalt();
        await cryptoSession.unlockVault(cmd.newPassword);
        await this.saveAllData(allData);
        await this.loadAllData();
    }

    private async validateOldPassword(oldPassword: string) {
        const isValid = cryptoSession.validatePassword(oldPassword);
        if(!isValid) throw new Error("Invalid Password");
    }

    private async pullAllData() {
        return {
            partners: await partnerRepository.getAll(),
            carriers: await deliveryCarrierRepository.getAll()
        }
    }

    private async deleteAllData() {
        await partnerRepository.saveAll([]);
        await deliveryCarrierRepository.saveAll([]);
    }

    private async saveAllData(allData: AllData) {
        await partnerRepository.saveAll(allData.partners);
        await deliveryCarrierRepository.saveAll(allData.carriers);
    }

    private async loadAllData() {
        this._loadPartnersCommandHandler.handle();
        this._loadDeliveryCarriesCommandHandler.handle();
    }
}