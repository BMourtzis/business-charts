import { VaultSession } from "@/infrastructure/security/crypto-session";

import { deliveryCarrierRepository } from "@/infrastructure/repositories/deliverCarrierRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import type { PartnerDTO } from "@/application/dto/partnerDTO";
import type { DeliveryCarrierDTO } from "@/application/dto/deliveryCarrierDTO";

export interface ChangePasswordCommand {
    oldPassword: string;
    newPassword: string
}

type AllData = {
    partners: PartnerDTO[],
    carriers: DeliveryCarrierDTO[]
}

export class ChangePasswordCommandHandler {
    async handle(cmd: ChangePasswordCommand) {
        await this.validateOldPassword(cmd.oldPassword);
        const allData = await this.pullAllData();
        await VaultSession.changePassword(cmd.oldPassword, cmd.newPassword);
        await this.saveAllData(allData);
    }

    private async validateOldPassword(oldPassword: string) {
        const isValid = await VaultSession.validatePassword(oldPassword);
        if(!isValid) throw new Error("Invalid Password");
    }

    private async pullAllData() {
        return {
            partners: await partnerRepository.getAll(),
            carriers: await deliveryCarrierRepository.getAll()
        }
    }

    private async saveAllData(allData: AllData) {
        await partnerRepository.saveAll(allData.partners);
        await deliveryCarrierRepository.saveAll(allData.carriers);
    }
}