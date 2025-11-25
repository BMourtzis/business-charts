import { getSessionKeyOrThrow } from "../security/crypto-session";
import { decryptData, encryptData } from "../security/encryption";
import { IStorage } from "./type";

export const EncryptedStorage: IStorage = {
    async getItem(key: string): Promise<string | null> {
        const encrypted = localStorage.getItem(key);
        if(!encrypted) return null;

        const cryptoKey = getSessionKeyOrThrow();
        const decryptedData = await decryptData(cryptoKey, encrypted);
        
        return JSON.parse(decryptedData);
    },
    async setItem(key: string, value: string): Promise<void> {
        const cryptoKey = getSessionKeyOrThrow();
        const encrypted = await encryptData(cryptoKey, value);
        localStorage.setItem(key, encrypted);
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}