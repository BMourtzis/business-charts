import * as cryptoSession from "@/infrastructure/security/crypto-session";

import { ClearStoresCommandHandler } from "@/application/commands/clearStoresCommand";

export class LockVaultCommandHandler {
    constructor(private _clearStoresCommandHandler: ClearStoresCommandHandler) {}

    async handle(): Promise<boolean> {
        cryptoSession.lockVault();

        this._clearStoresCommandHandler.handle({
            removeCarriers: true,
            removePartners: true,
            removeOrders: true
        });

        return cryptoSession.isVaultUnlocked();
    }
}