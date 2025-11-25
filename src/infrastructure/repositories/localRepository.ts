import { IMapper } from "@/application/mapper/type";
import { IRepository } from "./type";
import { IEntity } from "@/domain/type";
import { IEntityDTO } from "@/application/dto/type";
import { IStorage } from "@/infrastructure/persistence/type";

export abstract class LocalRepository<T extends IEntity, DTO extends IEntityDTO> implements IRepository<T, DTO> {
    private _storage: IStorage;
    private _mapper: IMapper<T, DTO>;
    private readonly _storageKey: string;

    constructor(storage: IStorage, mapper: IMapper<T, DTO>, key: string) {
        this._storage = storage;
        this._mapper = mapper;
        this._storageKey = key;
    }

    async getAll(): Promise<DTO[]> {
        return this.loadDTOs();
    }
    async saveAll(items: DTO[]): Promise<void> {
        return this.saveDTOs(items);
    }
    async load(): Promise<T[]> {
        const dtos = await this.loadDTOs();
        return dtos.map(this._mapper.toModel);
    }
    async getById(id: string): Promise<T | undefined> {
        const dtos = await this.loadDTOs();
        const item = dtos.find(i => i.id === id);
        if(!item) return undefined;

        return this._mapper.toModel(item);
    }
    async add(item: T): Promise<void> {
        const dtos = await this.loadDTOs();
        dtos.push(this._mapper.toDTO(item));
        this.saveDTOs(dtos);
    }
    async update(item: T): Promise<void> {
        const dtos = await this.loadDTOs();
        const i =  dtos.findIndex((o: DTO) => o.id === item.id);
        if(i !== -1) dtos[i] = this._mapper.toDTO(item);
        this.saveDTOs(dtos);
    }
    async remove(id: string): Promise<void> {
        const dtos = await this.loadDTOs();
        const filtered = dtos.filter((o: DTO) => o.id !== id);
        this.saveDTOs(filtered);
    }
    async removeAll(): Promise<void> {
        this.saveDTOs([]);
    }


    private async loadDTOs(): Promise<DTO[]> {
        const json = this._storage.getItem(this._storageKey);
        if(!json) return [];

        return JSON.parse(json);
    }

    private async saveDTOs(dtos: DTO[]): Promise<void> {
        this._storage.setItem(this._storageKey, JSON.stringify(dtos));
    }
}