export type StorageType = {
    getItems: (key: string) => string;
    setItem: (key: string, value: string) => string;
}