import { EventEmitter } from "../EventEmitter";
import { CryptoCore } from "./crypto-core";

export type VaultState = "locked" | "unlocked";
export class VaultSession {
    private static sessionKey: CryptoKey | null = null;

    private static stateChangedEmitter: EventEmitter<VaultState> = new EventEmitter();

    private static readonly TEST_TAG = "crypto_test_value";
    private static readonly TEST_KEY = "crypto_test_ciphertext";

    static onStateChanged(cb: (state: VaultState) => void) {
        this.stateChangedEmitter.subscribe(cb);
    }

    static async unlockVault(password: string): Promise<boolean> {
        const derivedKey = await CryptoCore.deriveKeyFromPassword(password);

        const isValid = await this.validatePasswordInternal(derivedKey);
        if (isValid) this.sessionKey = derivedKey;

        this.stateChangedEmitter.emit("unlocked");
        return isValid;
    }

    static lockVault(): void {
        this.sessionKey = null;
        this.stateChangedEmitter.emit("locked");
    }

    static isVaultUnlocked(): boolean {
        return this.sessionKey !== null;
    }

    private static getSessionKeyOrThrow(): CryptoKey {
        if (!this.sessionKey) throw new Error("Vault is locked. Call unlockVault() first.");
        return this.sessionKey;
    }

    static isInitialSetup(): boolean {
        return !CryptoCore.hasSalt() || !localStorage.getItem(this.TEST_KEY);
    }

    static requestKey(cb: () =>  void) {
        if(this.sessionKey) return;
        cb();
    }

    private static async validatePasswordInternal(key: CryptoKey): Promise<boolean> {
        const existing = localStorage.getItem(this.TEST_KEY);

        if (!existing) {
            await this.encryptAndStoreTestCiphertext(key);
            return true;
        }

        try {
            const decrypted = await this.decryptTestCiphertext(key, existing);
            return decrypted === this.TEST_TAG;
        } catch {
            return false;
        }
    }

    private static async encryptAndStoreTestCiphertext(key: CryptoKey): Promise<void> {
        const encrypted = await CryptoCore.encryptData(key, this.TEST_TAG);
        localStorage.setItem(this.TEST_KEY, encrypted);
    }

    private static async decryptTestCiphertext(key: CryptoKey, encrypted: string): Promise<string> {
        return CryptoCore.decryptData(key, encrypted);
    }

    static async validatePassword(password: string): Promise<boolean> {
        const derivedKey = await CryptoCore.deriveKeyFromPassword(password);
        return this.validatePasswordInternal(derivedKey);
    }

    static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        const unlocked = await this.unlockVault(oldPassword);
        if (!unlocked) throw new Error("Old password is incorrect");

        CryptoCore.createNewSalt();

        const newKey = await CryptoCore.deriveKeyFromPassword(newPassword);

        this.sessionKey = newKey;

        await this.encryptAndStoreTestCiphertext(newKey);
    }

    static async decrypt(data: string): Promise<string> {
        const key = this.getSessionKeyOrThrow();
        return await CryptoCore.decryptData(key, data);
    }

    static async encrypt(data: string): Promise<string> {
        const key = this.getSessionKeyOrThrow();
        return await CryptoCore.encryptData(key, data);
    }

    static async exportKeyInternal(callback: (exportedKey: string) => void): Promise<void> {
        const key = this.getSessionKeyOrThrow();
        const exportedKey = await CryptoCore.exportKey(key);
        callback(exportedKey);
    }

    static async importKey(exportedKey: string): Promise<void> {
        if(this.sessionKey) throw new Error("Vault is already unlocked.");
        
        const key = await CryptoCore.importKey(exportedKey);
        this.sessionKey = key;
        this.stateChangedEmitter.emit("unlocked");
    }
}
