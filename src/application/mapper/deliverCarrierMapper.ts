import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { DeliveryCarrierDTO } from "../dto/deliveryCarrierDTO";
import { AddressMapper, ContactMapper } from "./contactMapper";

export class DeliveryCarrierMapper {
    static toModel(dto: DeliveryCarrierDTO): DeliveryCarrier {
        const model = new DeliveryCarrier(
            dto.id,
            dto.name,
            dto.addresses.map(AddressMapper.toModel)
        );

        model.setEmails(dto.emails.map(ContactMapper.toModel));
        model.setPhones(dto.phones.map(ContactMapper.toModel));

        return model;
    }

    static toDTO(model: DeliveryCarrier): DeliveryCarrierDTO {
        return {
            id: model.id,
            name: model.name,
            addresses: model.addresses.map(AddressMapper.toDto),
            emails: model.emails.map(ContactMapper.toDto),
            phones: model.phones.map(ContactMapper.toDto)
        };
    }
}