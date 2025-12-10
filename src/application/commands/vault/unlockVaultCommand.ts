import { VaultSession } from "@/infrastructure/security/crypto-session";

import { keySyncService } from "@/infrastructure/services/keySyncService";

export interface UnlockVaultCommand {
    password: string;
}

export class UnlockVaultCommandHandler {

    async handle(cmd: UnlockVaultCommand) {
        await VaultSession.unlockVault(cmd.password);
        keySyncService.hasKey();
    }
}