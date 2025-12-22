import { v4 as uuidv4 } from "uuid";

import { IEntity } from "@/domain/type";
import { AttributesRecord, normalizeAttribute, OrderItemVariation } from "./orderItemVariation";

export class OrderItem implements IEntity {
    private _id: string;
    private _productId?: string;
    ///Price without vat
    private _basePrice: number;
    private _variations: OrderItemVariation[];

    name: string;


    constructor(
        id: string, 
        name: string,
        basePrice: number, 
        variations: OrderItemVariation[]) {
        this._id = id;
        this.name = name;
        this._basePrice = basePrice;

        if(variations.length === 0) {
            throw new Error("OrderItem must have at least one variations");
        }
        assertValidVariationSet(variations);
        this._variations = [...variations];
    }

    get id() { return this._id; }
    get quantity() { return this._variations.reduce((sum, item) => sum + item.quantity, 0); }
    get basePrice() { return this._basePrice; }
    get totalAmount() { return this.basePrice * this.quantity; }
    get variations(): readonly OrderItemVariation[] {
        return this._variations;
    }

    updateBasePrice(newPrice: number) {
        this._basePrice = newPrice;
    }
    

    addVariation(newVariation: OrderItemVariation) {
        this.assertEmptyAttributeVariations(newVariation);
        this.assertDuplicateAttribute(newVariation);

        this._variations.push(newVariation);
    }

    removeVariationByKey(normalizedAttributes: string) {
        const remainingVariations = this._variations
            .filter(v => v.normalizedAttributes !== normalizedAttributes)

        if(remainingVariations.length === 0) {
            throw new Error("OrderItem must have at least one variation");
        }

        this._variations = remainingVariations;
    }

    removeVariationByAttribute(attribute: AttributesRecord) {
        this.removeVariationByKey(normalizeAttribute(attribute));
    }

    private assertEmptyAttributeVariations(newVariation: OrderItemVariation) {
        const hasEmpty = this._variations.some(isEmptyAttributeVariation);
        const hasNonEmpty = this._variations.some(isNonEmptyAttributeVariation);

        if (
            (hasEmpty && isNonEmptyAttributeVariation(newVariation)) ||
            (hasNonEmpty && isEmptyAttributeVariation(newVariation))
        ) {
            throw new Error(
                "You cannot mix empty and non-empty attribute variations"
            );
        }
    }

    private assertDuplicateAttribute(newVariation: OrderItemVariation) {
        if(this._variations
            .some(v => v.normalizedAttributes === newVariation.normalizedAttributes)) {
            throw new Error(`Duplicate variation attributes: ${newVariation.normalizedAttributes}`);
        }
    }
}

function assertValidVariationSet(newVariations: OrderItemVariation[]) {
    if(hasEmptyAttributes(newVariations) && hasNonEmptyAttributes(newVariations)) {
        throw new Error("You cannot have empty and non-empty attributes in the same orderItem.");
    }

    const normalizedAttributes = newVariations.map(v => v.normalizedAttributes);
    const attributesSet = new Set(normalizedAttributes);
    if(attributesSet.size !== normalizedAttributes.length) {
        throw new Error("Duplicate attributes detected.");
    }
}

function isEmptyAttributeVariation(newVariation: OrderItemVariation) {
    return newVariation.normalizedAttributes === "";
}

function isNonEmptyAttributeVariation(newVariation: OrderItemVariation) {
    return newVariation.normalizedAttributes !== "";
}

function hasEmptyAttributes(newVariations: OrderItemVariation[]) {
    return newVariations.some(isEmptyAttributeVariation);
}

function hasNonEmptyAttributes(newVariations: OrderItemVariation[]) {
    return newVariations.some(isNonEmptyAttributeVariation);
}

export function createOrderItem(name: string, basePrice: number, vatRate: number, variations: OrderItemVariation[]): OrderItem {
    return new OrderItem(uuidv4(), name, basePrice, variations);
}