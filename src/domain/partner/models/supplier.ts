import { PartnerType } from "../partnerTypes";
import { Partner } from "./partner";
import { v4 as uuidv4 } from "uuid";

export class Supplier extends Partner {
    private _activity?: string;

    constructor(
        id: string, 
        clientNumber: number, 
        contactName: string, 
        activity?: string,
        businessName?: string
    ) {
        super(id, PartnerType.Supplier, clientNumber, businessName, contactName);
        this._activity = activity;
    }

    get activity() { return this._activity; }

    updateData(contactName?: string, businessName?: string, activity?: string) {
        super.updateData(contactName, businessName);

        if(activity && activity !== undefined && activity !== this._activity) {
            this._activity = activity;
        }
    }
}

export function createSupplier(
    name: string, 
    clientNumber: number, 
    activity?: string, 
    businessName?: string
): Supplier {
    return new Supplier(
        uuidv4(), 
        clientNumber, 
        name, 
        activity, 
        businessName
    );
}