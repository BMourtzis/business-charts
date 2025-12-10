// crypto-core.ts
export class CryptoCore {
    private static encoder = new TextEncoder();
    private static decoder = new TextDecoder();
    private static readonly SALT_KEY = "crypto_salt";

    static hasSalt(): boolean {
        return localStorage.getItem(this.SALT_KEY) != null;
    }

    static createNewSalt(length = 16): void {
        const salt = new Uint8Array(length);
        crypto.getRandomValues(salt);
        localStorage.setItem(this.SALT_KEY, this.toBase64(salt));
    }

    private static async getOrCreateSalt(): Promise<Uint8Array> {
        const existing = localStorage.getItem(this.SALT_KEY);
        if (existing) return this.fromBase64(existing);

        const salt = new Uint8Array(16);
        crypto.getRandomValues(salt);
        localStorage.setItem(this.SALT_KEY, this.toBase64(salt));
        return salt;
    }

    static toBase64(bytes: Uint8Array): string {
        return btoa(String.fromCharCode(...bytes));
    }

    static fromBase64(b64: string): Uint8Array {
        const binary = atob(b64);
        return Uint8Array.from(binary, c => c.charCodeAt(0));
    }

    static async deriveKeyFromPassword(password: string): Promise<CryptoKey> {
        const salt = await this.getOrCreateSalt();

        const baseKey = await crypto.subtle.importKey(
            "raw",
            this.encoder.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt.buffer as ArrayBuffer,
                iterations: 100_000,
                hash: "SHA-256"
            },
            baseKey,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    static async exportKey(key: CryptoKey): Promise<string> {
        const rawKey = await crypto.subtle.exportKey("raw", key);
        return this.toBase64(new Uint8Array(rawKey));
    }

    static async importKey(b64Key: string): Promise<CryptoKey> {
        const bytes = this.fromBase64(b64Key);
        return crypto.subtle.importKey(
            "raw",
            bytes.buffer as ArrayBuffer,
            { name: "AES-GCM" },
            false,
            ["encrypt", "decrypt"]
        );
    }

    static async encryptData(key: CryptoKey, data: unknown): Promise<string> {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encoded = this.encoder.encode(JSON.stringify(data));

        const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

        const cipherBytes = new Uint8Array(ciphertext);
        const combined = new Uint8Array(iv.length + cipherBytes.length);
        combined.set(iv);
        combined.set(cipherBytes, iv.length);

        return this.toBase64(combined);
    }

    static async decryptData(key: CryptoKey, encrypted: string): Promise<string> {
        const combined = this.fromBase64(encrypted);
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);

        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
        const decoded = this.decoder.decode(decrypted);

        return JSON.parse(decoded);
    }
}
