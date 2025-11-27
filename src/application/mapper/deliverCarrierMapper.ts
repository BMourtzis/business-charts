import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { DeliveryCarrierDTO } from "../dto/deliveryCarrierDTO";
import { AddressMapperInstance, ContactMapperInstance } from "./contactMapper";
import { IMapper } from "./type";

export class DeliveryCarrierMapper implements IMapper<DeliveryCarrier, DeliveryCarrierDTO> {
    toModel(dto: DeliveryCarrierDTO): DeliveryCarrier {
        const model = new DeliveryCarrier(
            dto.id,
            dto.name,
            dto.addresses.map(AddressMapperInstance.toModel)
        );

        model.setEmails(dto.emails.map(ContactMapperInstance.toModel));
        model.setPhones(dto.phones.map(ContactMapperInstance.toModel));

        return model;
    }

    toDTO(model: DeliveryCarrier): DeliveryCarrierDTO {
        return {
            id: model.id,
            name: model.name,
            addresses: model.addresses.map(AddressMapperInstance.toDTO),
            emails: model.emails.map(ContactMapperInstance.toDTO),
            phones: model.phones.map(ContactMapperInstance.toDTO)
        };
    }
}

export const DeliveryCarrierMapperInstance = new DeliveryCarrierMapper();