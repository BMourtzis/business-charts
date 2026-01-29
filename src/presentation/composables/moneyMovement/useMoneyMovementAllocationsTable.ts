import type { Order } from "@/domain/order/models/order";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";
import { computed, type Ref } from "vue";
import type { DataTableHeader } from "vuetify";
import { useLocalizationHelpers } from "../useLocalization";
import { getMoneyMovementAllocations } from "./useMoneyMovementDetails";

function toMovementAllocationTable(
    order: Order
): MoneyMovementAllocationTableRow[] {
    return order.allocations.map(a => ({
        orderId: order.id,
        orderNumber: getMovementNumber(order.orderNumber),
        amount: numberPriceToGreekFormatLocale(a.amount),
        allocatedAt: getDate(a.allocatedAt)
    }));
}

function getMovementNumber(orderNumber: string): string {
    return `#${orderNumber}`;
}

function getDate(date?: Date): string {
    if(!date) return "-";

    return date.toLocaleDateString()
}

function getHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('order.number'), key: "orderNumber", align: 'start' },
        { title: tCap('order.allocatedAt'), key: "allocatedAt", align: 'start' },
        { title: tCap('moneyMovement.amount'), key: "amount", align: 'start' },
    ] satisfies DataTableHeader[];
}

export function useMoneyMovementAllocationsTable(movevement: Ref<MoneyMovement>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const orders = getMoneyMovementAllocations(movevement.value.id, movevement.value.partnerId);

        return orders.value.flatMap(toMovementAllocationTable);
    });

    const headers = computed(() => getHeaders(tCap));

    return {data, headers};
}

export interface MoneyMovementAllocationTableRow {
    orderId: string,
    orderNumber: string,
    amount: string
    allocatedAt: string,
}