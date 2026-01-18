import { Partner } from "@/domain/partner/models/partner";
import type { PartnerDTO } from "../dto/partnerDTO";
import { AddressMapperInstance, ContactMapperInstance } from "./contactMapper";
import { PartnerType } from "@/domain/partner/partnerTypes";
import { Supplier } from "@/domain/partner/models/supplier";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";
import type { IMapper } from "./type";


function getModelType(dto: PartnerDTO) {
    switch(dto.type) {
        case PartnerType.Supplier:
            return new Supplier(
                dto.id,
                dto.clientNumber,
                dto.contactName,
                dto.activity ?? '',
                dto.businessName
            );
        case PartnerType.B2BCustomer:
            return new B2BCustomer(
                dto.id,
                dto.contactName,
                dto.clientNumber,
                dto.deliveryCarrierId ?? '',
                dto.businessName
            );
        default:
            throw new Error(`Unsupported partner type: ${dto}`);
    }
}

export class PartnerMapper implements IMapper<Partner, PartnerDTO> {
    toModel(dto: PartnerDTO): Partner {
        const model = getModelType(dto);
        model.setEmails(dto.emails.map(ContactMapperInstance.toModel));
        model.setPhones(dto.phones.map(ContactMapperInstance.toModel));
        model.setAddresses(dto.addresses.map(AddressMapperInstance.toModel));

        return model;
    }

    toDTO(model: Partner): PartnerDTO {
        const base  = {
            id: model.id,
            clientNumber: model.clientNumber,
            businessName: model.businessName,
            contactName: model.contactName,
            type: model.type,
            emails: model.emails.map(ContactMapperInstance.toDTO),
            phones: model.phones.map(ContactMapperInstance.toDTO),
            addresses: model.addresses.map(AddressMapperInstance.toDTO)
        };

        if(model instanceof Supplier) {
            return {
                ...base,
                activity: model.activity
            };
        }

        if(model instanceof B2BCustomer) {
            return {
                ...base,
                deliveryCarrierId: model.deliveryCarrierId
            };
        }

        throw new Error(`Unsupported partner instance. Id: ${model.id}`);
    }
}

export const PartnerMapperInstance = new PartnerMapper();
