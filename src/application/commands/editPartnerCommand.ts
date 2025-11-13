import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../mapper/partnerMapper";

export interface EditPartnerCommand {
    id: string;
    contactName: string;
    businessName?: string;
}

export class EditPartnerCommandHandler {
    async handle(cmd: EditPartnerCommand) {
        const partner = await partnerRepository.getById(cmd.id);
        if (!partner) return;
        
        partner.updateData(cmd.contactName, cmd.businessName);

        const store = usePartnersStore();
        await partnerRepository.update(partner);
        await store.update(PartnerMapper.toDTO(partner));

        return partner;
    }
}

export interface EditSupplierCommand {
    id: string;
    contactName: string;
    activity: string;
    businessName?: string;
}

export class EditSupplierCommandHandler {
    async handle(cmd: EditSupplierCommand) {
        const supplier = await partnerRepository.getSupplierById(cmd.id);
        if (!supplier) return;
        
        supplier.updateData(cmd.contactName, cmd.businessName, cmd.activity);

        const store = usePartnersStore();
        await partnerRepository.update(supplier);
        await store.update(PartnerMapper.toDTO(supplier));

        return supplier;
    }
}

export interface EditB2BCustomerCommand {
    id: string;
    contactName: string;
    deliveryCarrierId: string;
    businessName?: string;
}

export class EditB2BCustomerCommandHandler {
    async handle(cmd: EditB2BCustomerCommand) {
        const b2bCustomer = await partnerRepository.getB2BCustomerById(cmd.id);
        if (!b2bCustomer) return;
        
        b2bCustomer.updateData(cmd.contactName, cmd.businessName);
        b2bCustomer.deliverCarrierId = cmd.deliveryCarrierId;

        const store = usePartnersStore();
        await partnerRepository.update(b2bCustomer);
        await store.update(PartnerMapper.toDTO(b2bCustomer));

        return b2bCustomer;
    }
}