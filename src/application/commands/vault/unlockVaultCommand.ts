import * as cryptoSession from "@/infrastructure/security/crypto-session";

import { LoadAllDataCommandHandler } from "@/application/commands/loadAllDataCommand";

export interface UnlockVaultCommand {
    password: string;
}

export class UnlockVaultCommandHandler {
    constructor(private _loadAllDataCommandHandler: LoadAllDataCommandHandler) {}

    async handle(cmd: UnlockVaultCommand) {
        await cryptoSession.unlockVault(cmd.password);

        try {
            await this._loadAllDataCommandHandler.handle();
        } catch(e) {
            console.log(e);
            cryptoSession.lockVault();
            throw e;
        }

        return cryptoSession.isVaultUnlocked();
    }
}