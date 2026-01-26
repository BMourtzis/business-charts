import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";

export function getDate(date: Date) {
    return date.toLocaleDateString()
}

export function getAmount(amount: number): string {
    return numberPriceToGreekFormatLocale(amount);
}