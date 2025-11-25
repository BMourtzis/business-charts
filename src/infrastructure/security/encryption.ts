const encoder = new TextEncoder();
const decoder = new TextDecoder();

export async function encryptData(key: CryptoKey, data: unknown): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(JSON.stringify(data));

    const ciphertext = await crypto.subtle.encrypt({name: "AES-GCM", iv}, key, encoded);

    const cipherBytes = new Uint8Array(ciphertext);
    const combined = new Uint8Array(iv.length + cipherBytes.length);
    combined.set(iv);
    combined.set(cipherBytes, iv.length);

    let binary = "";
    for(let i = 0; i < combined.length; i++) {
        binary += String.fromCharCode(combined[i]);
    }

    return btoa(binary);
}

export async function decryptData(key: CryptoKey, encrypted: string): Promise<string> {
    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        {name: 'AES-GCM', iv},
        key,
        ciphertext
    );

    const json = decoder.decode(decrypted);
    return json;
}