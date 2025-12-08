import { IEntity } from "@/domain/type";
import { IEntityDTO } from "../dto/type";

export interface  IMapper<T extends IEntity, DTO extends IEntityDTO> {
    toModel: (dto: DTO) => T;
    toDTO: (model: T) => DTO;
}