export interface Repository<T, DTO> {
    getAll(): Promise<DTO[]>;
    saveAll(items: DTO[]): Promise<void>;
    load(): Promise<T[]>;
    add(order: T): Promise<void>;
    update(order: T): Promise<void>;
    remove(id: string): Promise<void>;
}