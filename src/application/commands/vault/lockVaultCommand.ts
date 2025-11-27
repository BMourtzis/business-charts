import { VaultSession } from "@/infrastructure/security/crypto-session";

import { ClearStoresCommandHandler } from "@/application/commands/clearStoresCommand";

export class LockVaultCommandHandler {
    constructor(private _clearStoresCommandHandler: ClearStoresCommandHandler) {}

    async handle(): Promise<boolean> {
        VaultSession.lockVault();

        this._clearStoresCommandHandler.handle({
            removeCarriers: true,
            removePartners: true,
            removeOrders: true
        });

        return VaultSession.isVaultUnlocked();
    }
}