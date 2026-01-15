import { v4 as uuidv4 } from "uuid";

import { IEntity } from "@/domain/type";
import { AttributesRecord, normalizeAttribute, OrderItemVariation } from "./orderItemVariation";
import { assertNoDuplicateKeys, VariationChange } from "./variationChange";

export class OrderItem implements IEntity {
    private _id: string;
    private _productId?: string;
    private _variations: OrderItemVariation[];

    name: string;

    constructor(
        id: string, 
        name: string,
        variations: OrderItemVariation[]) {
        this._id = id;
        this.name = name;

        if(variations.length === 0) {
            throw new Error("OrderItem must have at least one variations");
        }
        assertValidVariationSet(variations);
        this._variations = [...variations];
    }

    get id() { return this._id; }
    get quantity() { return this._variations.reduce((sum, item) => sum + item.quantity, 0); }
    get sumAmount() { return this._variations.reduce((sum, item) => sum + item.sum, 0); }
    get variations(): readonly OrderItemVariation[] {
        return this._variations;
    }

    rename(newName: string) {
        if(newName === undefined || newName === "") return;
        this.name = newName;
    }

    //Variations
    addVariation(newVariation: OrderItemVariation) {
        this.assertMixedAttributeVariations(newVariation);
        this.assertDuplicateAttribute(newVariation);

        this._variations.push(newVariation);
    }

    removeVariationByKey(key: string) {
        const remainingVariations = this._variations
            .filter(v => v.normalizedAttributes !== key);

        if(remainingVariations.length === 0) {
            throw new Error("OrderItem must have at least one variation");
        }

        this._variations = remainingVariations;
    }

    removeVariationByAttribute(attribute: AttributesRecord) {
        this.removeVariationByKey(normalizeAttribute(attribute));
    }

    changeVariationQuantity(key: string, newQuantity: number) {
        const variation = this.getVariation(key);
        this.replaceVariation(key, new OrderItemVariation(newQuantity, variation.price, variation.attributes));
    }

    changeVariationPrice(key: string, newPrice: number) {
        const variation = this.getVariation(key);
        this.replaceVariation(key, new OrderItemVariation(variation.quantity, newPrice, variation.attributes));
    }

    applyVariationChanges(changes: VariationChange[]) {
        assertNoDuplicateKeys(changes);

        for(const change of changes) {
            const current = this.getVariation(change.variationKey);

            const quantity = change.quantity ?? current.quantity;
            const price = change.price ?? current.price;

            if(quantity == current.quantity && price == current.price) continue;

            this.replaceVariation(
                change.variationKey, 
                new OrderItemVariation(quantity, price, current.attributes)
            );
        }
    }

    private replaceVariation(key: string, replacement: OrderItemVariation) {
        const index = this._variations.findIndex( v => v.normalizedAttributes === key);

        if(index === -1) throw new Error(`Variation ${key} not found`);
        this.assertDuplicateAttribute(replacement, key);

        this._variations[index] = replacement;
    }

    private getVariation(key: string) {
        const variation = this._variations.find(v => v.normalizedAttributes === key);
        if (!variation) throw new Error(`Variation ${key} not found`);
        return variation;
    }

    private assertMixedAttributeVariations(newVariation: OrderItemVariation) {
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

    private assertDuplicateAttribute(
        variation: OrderItemVariation,
        replacingKey?: string
    ) {
        if (
            this._variations.some(
                v =>
                    v.normalizedAttributes === variation.normalizedAttributes &&
                    v.normalizedAttributes !== replacingKey
            )
        ) {
            throw new Error(
                `Duplicate variation attributes: ${variation.normalizedAttributes}`
            );
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

export function createOrderItem(
    name: string, 
    basePrice: number, 
    variations: OrderItemVariation[]): OrderItem {
    return new OrderItem(uuidv4(), name, variations);
}