import { ContactType } from "@/domain/contact/contactTypes";
import { usePartners } from "./usePartners";
import { useDeliveryCarriers } from "./useDeliveryCarriers";

export interface BaseContactPayload {
    ownerId: string;
    value: string;
    name: string;
    isPrimary: boolean;
}

export type AddContactPayload = BaseContactPayload
export interface EditContactPayload extends BaseContactPayload {
    contactId: string;
}

export type ContactOwnerType = 'partner' | 'deliveryCarrier';

export interface ContactHandlers {
    add(payload: AddContactPayload): Promise<void>;
    edit(payload: EditContactPayload): Promise<void>;
}

export function useContactHandlers(ownerType: ContactOwnerType, contactType: ContactType) {
    if(ownerType === 'partner') {
        const { addEmailCommandHandler, addPhoneCommandHandler, editEmailCommandHandler, editPhoneCommandHandler } = usePartners();

        if (contactType === ContactType.Email) {
            return {
                add: async (payload: AddContactPayload) => {
                    await addEmailCommandHandler.handle({
                        partnerId: payload.ownerId,
                        email: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                },
                edit: async (payload: EditContactPayload) => {
                    await editEmailCommandHandler.handle({
                        partnerId: payload.ownerId,
                        emailId: payload.contactId,
                        email: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                }
            };
        }
        
        if (contactType === ContactType.Phone) {
            return {
                add: async (payload: AddContactPayload) => {
                    await addPhoneCommandHandler.handle({
                        partnerId: payload.ownerId,
                        phone: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                },
                edit: async (payload: EditContactPayload) => {
                    await editPhoneCommandHandler.handle({
                        partnerId: payload.ownerId,
                        phoneId: payload.contactId,
                        phone: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                }
            };
        }
    }

    if(ownerType === 'deliveryCarrier') {
        const { addEmailCommandHandler, addPhoneCommandHandler, editEmailCommandHandler, editPhoneCommandHandler } = useDeliveryCarriers();

        if (contactType === ContactType.Email) {
            return {
                add: async (payload: AddContactPayload) => {
                    await addEmailCommandHandler.handle({
                        carrierId: payload.ownerId,
                        email: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                },
                edit: async (payload: EditContactPayload) => {
                    await editEmailCommandHandler.handle({
                        carrierId: payload.ownerId,
                        emailId: payload.contactId,
                        email: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                }
            };
        }
        
        if (contactType === ContactType.Phone) {
            return {
                add: async (payload: AddContactPayload) => {
                    await addPhoneCommandHandler.handle({
                        carrierId: payload.ownerId,
                        phone: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                },
                edit: async (payload: EditContactPayload) => {
                    await editPhoneCommandHandler.handle({
                        carrierId: payload.ownerId,
                        phoneId: payload.contactId,
                        phone: payload.value,
                        name: payload.name,
                        isPrimary: payload.isPrimary
                    });
                }
            };
        }
    }

    throw new Error(`Unsupported ownerType (${ownerType}) or contactType (${contactType})`);
}