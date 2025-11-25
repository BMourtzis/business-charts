export interface  IMapper<T, DTO> {
    toModel: (dto: DTO) => T;
    toDTO: (model: T) => DTO;
}