import { PartnerType } from "../../types/partnerTypes";
import { Partner } from "./partner";
import { v4 as uuidv4 } from "uuid";

export class Supplier extends Partner {
    private _activity: string;

    constructor(id: string, activity: string, contactName: string, businessName?: string) {
        super(id, PartnerType.Supplier, contactName, businessName);
        this._activity = activity;
    }

    get activity() { return this._activity; }
    set activity(value: string) {
        this._activity = value;
    }

    updateData(contactName?: string, businessName?: string, activity?: string) {
        this.updateData(contactName, businessName);

        if(activity && activity !== undefined && activity !== this._activity) {
            this._activity = activity;
        }
    }
}

export function createSupplier(name: string, activity: string, businessName?: string): Supplier {
    return new Supplier(uuidv4(), name, activity, businessName);
}