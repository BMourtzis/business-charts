import type { Order } from "@/domain/order/models/order";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";
import { computed, type Ref } from "vue";
import type { DataTableHeader } from "vuetify";
import { useLocalizationHelpers } from "../useLocalization";
import { getMoneyMovementAllocations } from "./useMoneyMovementDetails";
import type { MoneyAllocation } from "@/domain/order/models/moneyAllocation";

function toMovementAllocationTable(
    order: Order
): MoneyMovementAllocationTableRow[] {
    const allocations = order.allocations;
    const orAllocations = allocations.filter(a => !a.refundFor);

    return orAllocations.map(a => ({
        orderId: order.id,
        orderNumber: getMovementNumber(order.orderNumber),
        amount: numberPriceToGreekFormatLocale(a.effectiveAmount),
        allocatedAt: getDate(a.allocatedAt),
        allocation: a,
        reversals: getAllocationReversal(a.id, allocations)
    }));
}

function getAllocationReversal(
    allocationId: string,
    allocations: Readonly<MoneyAllocation[]>
): MoneyMovementAllocationReversalTableRow[] {
    return allocations
        .filter(r => r.refundFor === allocationId)
        .map(r => ({
            amount: numberPriceToGreekFormatLocale(r.effectiveAmount),
            allocatedAt: getDate(r.allocatedAt)
        }))
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
        { title: tCap('order.title.orderNumber'), key: "orderNumber", align: 'start' },
        { title: tCap('order.title.allocatedAt'), key: "allocatedAt", align: 'start' },
        { title: tCap('moneyMovement.amount'), key: "amount", align: 'start' },
        { title: tCap('common.action', 2), key: "actions", align: 'start'}
    ] satisfies DataTableHeader[];
}

function getReversalHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('order.title.reversalDate'), key: "allocatedAt", align: 'start' },
        { title: tCap('order.title.reversalAmount'), key: "amount", align: 'start' },
    ] satisfies DataTableHeader[];
}

export function useMoneyMovementAllocationsTable(movevement: Ref<MoneyMovement>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const orders = getMoneyMovementAllocations(movevement.value.id, movevement.value.partnerId);

        return orders.value.flatMap(toMovementAllocationTable);
    });

    const headers = computed(() => getHeaders(tCap));

    const reversalHeaders = computed(() => getReversalHeaders(tCap));

    return {data, headers, reversalHeaders};
}

export interface MoneyMovementAllocationTableRow {
    orderId: string,
    orderNumber: string,
    amount: string
    allocatedAt: string,
    allocation: MoneyAllocation,
    reversals: MoneyMovementAllocationReversalTableRow[]
}

export interface MoneyMovementAllocationReversalTableRow {
    amount: string
    allocatedAt: string,
}