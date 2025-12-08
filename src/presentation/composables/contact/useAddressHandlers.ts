import { useDeliveryCarriers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarriers";
import { usePartners } from "@/presentation/composables/partner/usePartners";

export interface AddressHandlers {
  add(data: AddAddressPayload): Promise<void>;
  edit(data: EditAddressPayload): Promise<void>;
}

export interface BaseAddressPayload {
  ownerId: string;
  street: string;
  city: string;
  zip?: string;
  country?: string;
  name?: string;
  isPrimary: boolean;
}

export type AddAddressPayload = BaseAddressPayload;
export interface EditAddressPayload extends BaseAddressPayload {
  addressId: string;
}

export type AddressOwnerType = "partner" | "deliveryCarrier";

export function useAddressHandlers(ownerType: AddressOwnerType): AddressHandlers {
    if(ownerType === 'partner') {
        const { addAddressCommandHandler, editAddressCommandHandler } = usePartners();

        return {
            add: async(payload: AddAddressPayload) => {
                await addAddressCommandHandler.handle({
                    partnerId: payload.ownerId,
                    street: payload.street,
                    city: payload.city,
                    zip: payload.zip,
                    country: payload.country,
                    name: payload.name,
                    isPrimary: payload.isPrimary
                });
            },
            edit: async (payload: EditAddressPayload) => {
                await editAddressCommandHandler.handle({
                    partnerId: payload.ownerId,
                    addressId: payload.addressId,
                    street: payload.street,
                    city: payload.city,
                    zip: payload.zip,
                    country: payload.country,
                    name: payload.name,
                    isPrimary: payload.isPrimary
                });
            }
        }
    }

    if(ownerType === 'deliveryCarrier') {
        const { addAddressCommandHandler, editAddressCommandHandler } = useDeliveryCarriers();

        return {
            add: async(payload: AddAddressPayload) => {
                await addAddressCommandHandler.handle({
                    carrierId: payload.ownerId,
                    street: payload.street,
                    city: payload.city,
                    zip: payload.zip,
                    country: payload.country,
                    name: payload.name,
                    isPrimary: payload.isPrimary
                });
            },
            edit: async (payload: EditAddressPayload) => {
                await editAddressCommandHandler.handle({
                    carrierId: payload.ownerId,
                    addressId: payload.addressId,
                    street: payload.street,
                    city: payload.city,
                    zip: payload.zip,
                    country: payload.country,
                    name: payload.name,
                    isPrimary: payload.isPrimary
                });
            }
        }
    }

    throw new Error(`Unknown owner type: ${ownerType}`);
}

