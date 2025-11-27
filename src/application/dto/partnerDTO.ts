import { PartnerType } from "@/domain/partner/partnerTypes"
import { AddressDTO, ContactDTO } from "./contactDTO"
import { IEntityDTO } from "./type"

export interface PartnerDTO extends IEntityDTO {
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