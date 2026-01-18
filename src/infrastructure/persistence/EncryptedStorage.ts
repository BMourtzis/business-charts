import { VaultSession } from "@/infrastructure/security/crypto-session";
import { type IStorage } from "./type";

export class EncryptedStorage implements IStorage {
    private readonly _storage = localStorage;

    async getItem(key: string): Promise<string | null> {
        const encrypted = this._storage.getItem(key);
        if(!encrypted) return null;

        return await VaultSession.decrypt(encrypted);
    }

    async setItem(key: string, value: string): Promise<void> {
        const encrypted = await VaultSession.encrypt(value);
        this._storage.setItem(key, encrypted);
    }

    removeItem(key: string): void {
        this._storage.removeItem(key);
    }
}

export const encryptedStorageInstance = new EncryptedStorage();