import { ContactType } from "@/domain/types/contactTypes"

export interface ContactDTO {
    id: string
    type: ContactType
    name?: string
    value: string
    isPrimary: boolean
}