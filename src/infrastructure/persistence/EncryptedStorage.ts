import { VaultSession } from "@/infrastructure/security/crypto-session";
import { IStorage } from "./type";

export const EncryptedStorage: IStorage = {
    async getItem(key: string): Promise<string | null> {
        const encrypted = localStorage.getItem(key);
        if(!encrypted) return null;

        return await VaultSession.decrypt(encrypted);
    },
    async setItem(key: string, value: string): Promise<void> {
        const encrypted = await VaultSession.encrypt(value);
        localStorage.setItem(key, encrypted);
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}