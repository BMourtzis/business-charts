import { PartnerType } from "@/domain/types/partnerTypes"
import { ContactDTO } from "./contactDTO"

export interface PartnerDTO {
    id: string
    contactName: string
    type: PartnerType
    businessName?: string
    vatNumber?: string
    emails: ContactDTO[]
    phones: ContactDTO[]
    addresses: ContactDTO[]
}