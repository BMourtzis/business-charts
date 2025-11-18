import { AddressDTO, ContactDTO } from "./contactDTO";

export interface DeliveryCarrierDTO {
    id: string;
    name: string;
    addresses: AddressDTO[],
    emails: ContactDTO[],
    phones: ContactDTO[]
}