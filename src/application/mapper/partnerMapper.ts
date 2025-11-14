import { Partner } from "@/domain/partner/models/partner";
import { PartnerDTO } from "../dto/partnerDTO";
import { ContactMapper, AddressMapper } from "./contactMapper";
import { PartnerType } from "@/domain/partner/partnerTypes";
import { Supplier } from "@/domain/partner/models/supplier";
import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";


function getModelType(dto: PartnerDTO) {
    switch(dto.type) {
        case PartnerType.Supplier:
            return new Supplier(
                dto.id,
                dto.contactName,
                dto.activity ?? '',
                dto.businessName
            );
        case PartnerType.B2BCustomer:
            return new B2BCustomer(
                dto.id,
                dto.contactName,
                dto.deliveryCarrierId ?? '',
                dto.businessName
            );
        default:
            throw new Error(`Unsupported partner type: ${dto}`);
    }
}

export class PartnerMapper {
    static toModel(dto: PartnerDTO): Partner {
        const model = getModelType(dto);
        model.setEmails(dto.emails.map(ContactMapper.toModel));
        model.setPhones(dto.phones.map(ContactMapper.toModel));
        model.setAddresses(dto.addresses.map(AddressMapper.toModel));

        return model;
    }

    static toDTO(model: Partner): PartnerDTO {
        const base  = {
            id: model.id,
            businessName: model.businessName,
            contactName: model.contactName,
            type: model.type,
            emails: model.emails.map(ContactMapper.toDto),
            phones: model.phones.map(ContactMapper.toDto),
            addresses: model.addresses.map(AddressMapper.toDto)
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
                deliveryCarrierId: model.deliverCarrierId
            };
        }

        throw new Error(`Unsupported partner instance. Id: ${model.id}`);
    }
}
