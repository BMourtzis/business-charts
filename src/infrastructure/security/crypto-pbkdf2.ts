const encoder = new TextEncoder();
const SALT_KEY = 'crypto_salt';

function getRandomSalt(length = 16): Uint8Array  {
    const salt = new Uint8Array (length);
    crypto.getRandomValues(salt);
    return salt;
}

function saltToBase64(salt: Uint8Array ): string {
    return btoa(String.fromCharCode(...salt));
}

function base64ToSalt(b64: string): Uint8Array  {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

async function getOrCreateSalt(): Promise<Uint8Array> {
    const existing = localStorage.getItem(SALT_KEY);
    if(existing) return base64ToSalt(existing);

    const salt = getRandomSalt();
    localStorage.setItem(SALT_KEY, saltToBase64(salt));
    return salt;
}

export async function deriveKeyFromPassword(password: string): Promise<CryptoKey> {
    const salt = await getOrCreateSalt();

    const baseKey = await crypto.subtle.importKey("raw", encoder.encode(password), {name: "PBKDF2"}, false, ['deriveKey']);

    const aesKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt.buffer as ArrayBuffer,
            iterations: 100_000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: "AES-GCM", length: 256},
        false,
        ["encrypt", "decrypt"]
    );

    return aesKey;
}

