import { PartnerType } from "@/domain/types/partnerTypes"
import { AddressDTO, ContactDTO } from "./contactDTO"

export interface PartnerDTO {
    id: string
    contactName: string
    type: PartnerType
    businessName?: string
    emails: ContactDTO[]
    phones: ContactDTO[]
    addresses: AddressDTO[]
    activity?: string
    deliveryCarrierId?: string;
}