import { VaultSession } from "@/infrastructure/security/crypto-session";

import { LoadAllDataCommandHandler } from "@/application/commands/loadAllDataCommand";

export interface UnlockVaultCommand {
    password: string;
}

export class UnlockVaultCommandHandler {
    constructor(private _loadAllDataCommandHandler: LoadAllDataCommandHandler) {}

    async handle(cmd: UnlockVaultCommand) {
        const unlocked =  await VaultSession.unlockVault(cmd.password);

        if(unlocked) {
            await this._loadAllDataCommandHandler.handle();
        }

        return VaultSession.isVaultUnlocked();
    }
}