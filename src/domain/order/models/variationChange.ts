export type VariationChange = {
    variationKey: string,
    quantity: number,
    price: number
}

export function assertNoDuplicateKeys(changes: VariationChange[]) {
    const seen = new Set<string>();

    for (const change of changes) {
        if (seen.has(change.variationKey)) {
            throw new Error(
                `Duplicate variation key in changes: ${change.variationKey}`
            );
        }
        seen.add(change.variationKey);
    }
}