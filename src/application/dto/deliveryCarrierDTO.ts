import { AddressDTO, ContactDTO } from "./contactDTO";

export interface DeliveryCarrierDTO {
    id: string;
    name: string;
    locations: AddressDTO[],
    emails: ContactDTO[],
    phones: ContactDTO[]
}