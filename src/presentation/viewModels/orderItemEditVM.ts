import { VariationEditVM } from "./variationEditVM"

export type OrderItemEditVM = {
    id: string,
    name: string,
    basePrice: number,
    variations: VariationEditVM[]
}