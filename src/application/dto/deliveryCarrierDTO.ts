import { AddressDTO, ContactDTO } from "./contactDTO";
import { IEntityDTO } from "./type";

export interface DeliveryCarrierDTO extends IEntityDTO {
    id: string;
    name: string;
    addresses: AddressDTO[],
    emails: ContactDTO[],
    phones: ContactDTO[]
}