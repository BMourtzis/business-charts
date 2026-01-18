import { PartnerType } from "@/domain/partner/partnerTypes"
import type { AddressDTO, ContactDTO } from "./contactDTO"
import type { IEntityDTO } from "./type"

export interface PartnerDTO extends IEntityDTO {
    id: string
    clientNumber: number;
    contactName: string
    type: PartnerType
    businessName?: string
    emails: ContactDTO[]
    phones: ContactDTO[]
    addresses: AddressDTO[]
    activity?: string
    deliveryCarrierId?: string;
}