import { IStorage } from "./type";

export const LocalStorage: IStorage = {
    async getItem(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    },
    async setItem(key: string, value: string): Promise<void> {
        return localStorage.setItem(key, value);
    },
    removeItem(key: string): void {
        return localStorage.removeItem(key) 
    }
}