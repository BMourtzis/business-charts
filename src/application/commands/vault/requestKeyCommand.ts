import { VaultSession } from "@/infrastructure/security/crypto-session";
import { keySyncService } from "@/infrastructure/services/keySyncService";

export class RequestKeyCommandHandler {
    async handle(): Promise<void> {
        if (!VaultSession.isVaultUnlocked()) {
            keySyncService.requestKey();
        }
    }
}