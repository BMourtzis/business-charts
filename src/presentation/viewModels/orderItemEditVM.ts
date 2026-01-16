import { VariationEditVM } from "./variationEditVM"

export type OrderEditVM = {
    direction: 'Credit' | "Debit",
    partnerId: string,
    vatRate: number,
    dueDate: Date | null,
    notes: string,
    depositAmount: number,
    discountAmount: number,
    items: OrderItemEditVM[]
}

export type OrderItemEditVM = {
    id: string,
    name: string,
    basePrice: number,
    variations: VariationEditVM[]
}