import { deriveKeyFromPassword, hasSalt } from "./crypto-pbkdf2";

let sessionKey: CryptoKey | null = null;

export async function unlockVault(password: string): Promise<void> {
    sessionKey = await deriveKeyFromPassword(password);
}

export function lockVault(): void {
    sessionKey = null;
}

export function isVaultUnlocked(): boolean {
    return sessionKey !== null;
}

export function getSessionKeyOrThrow(): CryptoKey {
    if(!sessionKey) throw new Error("Vault is locked. Call unlockVault(password) first.");

    return sessionKey;
}

export function isInitialSetup(): boolean {
    return !hasSalt();
}