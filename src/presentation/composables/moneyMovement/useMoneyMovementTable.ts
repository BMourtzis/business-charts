import type { Partner } from "@/domain/partner/models/partner";
import type { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
import { computed, type Ref } from "vue";
import { useLocalizationHelpers } from "../useLocalization";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { getPartnerDetails } from "../partner/usePartnerDetails";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";
import type { DataTableHeader } from "vuetify";

function toMovementTable(
    movement: MoneyMovement
): MoneyMovementTableRow {
    return {
        id: movement.id,
        movementNumber: getMovementNumber(movement.movementNumber),
        partner: getPartnerDetails(movement.partnerId),
        createdDate: getDate(movement.createdDate),
        amount: numberPriceToGreekFormatLocale(movement.amount),
        method: movement.method,
        direction: movement.direction,
        reason: movement.reason
    };
}

function getMovementNumber(orderNumber: string): string {
    return `#${orderNumber}`;
}

function getDate(date?: Date): string {
    if(!date) return "-";

    return date.toLocaleDateString()
}

function getMovementHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('moneyMovement.number'), key: "movementNumber", align: 'start' },
        { title: tCap('partner.businessName'), key: "partner", align: 'start' },
        { title: tCap('moneyMovement.createdDate'), key: "createdDate", align: 'start' },
        { title: tCap('moneyMovement.direction'), key: "direction", align: 'start' },
        { title: tCap('moneyMovement.reason'), key: "reason", align: 'start' },
        { title: tCap('moneyMovement.method'), key: "method", align: 'start' },
        { title: tCap('moneyMovement.amount'), key: "amount", align: 'start' },
        
    ] satisfies DataTableHeader[];
}

export function useMoneyMovementTable(movementRef: Ref<MoneyMovement[] | undefined>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const movements = movementRef.value ?? [];

        return movements.map(m => toMovementTable(m));
    });

    const headers = computed(() => getMovementHeaders(tCap));

    return { data, headers };
}

export interface MoneyMovementTableRow {
    id: string,
    movementNumber: string,
    partner?: Partner,
    amount: string
    method: PaymentMethod,
    direction: MoneyDirection,
    reason: MoneyMovementReason
    createdDate: string,
}