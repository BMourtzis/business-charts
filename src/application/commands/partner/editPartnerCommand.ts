import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { PartnerMapper } from "../../mapper/partnerMapper";

export interface EditPartnerCommand {
    id: string;
    contactName: string;
    businessName?: string;
}

export class EditPartnerCommandHandler {
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditPartnerCommand) {
        const partner = await partnerRepository.getById(cmd.id);
        if (!partner) return;
        
        partner.updateData(cmd.contactName, cmd.businessName);

        await partnerRepository.update(partner);
        this._partnersStore.update(PartnerMapper.toDTO(partner));

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
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditSupplierCommand) {
        const supplier = await partnerRepository.getSupplierById(cmd.id);
        if (!supplier) return;
        
        supplier.updateData(cmd.contactName, cmd.businessName, cmd.activity);

        await partnerRepository.update(supplier);
        this._partnersStore.update(PartnerMapper.toDTO(supplier));

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
    constructor(private _partnersStore = usePartnersStore()) {}

    async handle(cmd: EditB2BCustomerCommand) {
        const b2bCustomer = await partnerRepository.getB2BCustomerById(cmd.id);
        if (!b2bCustomer) return;
        
        b2bCustomer.updateData(cmd.contactName, cmd.businessName);
        b2bCustomer.deliverCarrierId = cmd.deliveryCarrierId;

        await partnerRepository.update(b2bCustomer);
        this._partnersStore.update(PartnerMapper.toDTO(b2bCustomer));

        return b2bCustomer;
    }
}