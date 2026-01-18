import type { IEntity } from "@/domain/type";
import type { IEntityDTO } from "../dto/type";

export interface  IMapper<T extends IEntity, DTO extends IEntityDTO> {
    toModel: (dto: DTO) => T;
    toDTO: (model: T) => DTO;
}