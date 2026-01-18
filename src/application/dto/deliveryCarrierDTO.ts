import type { AddressDTO, ContactDTO } from "./contactDTO";
import type { IEntityDTO } from "./type";

export interface DeliveryCarrierDTO extends IEntityDTO {
    id: string;
    name: string;
    addresses: AddressDTO[],
    emails: ContactDTO[],
    phones: ContactDTO[]
}