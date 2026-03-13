import { computed, type Ref } from "vue";

import type { MoneyAllocation } from "@/domain/order/models/moneyAllocation";
import type { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";

import { useLocalizationHelpers } from "../useLocalization";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import type { MoneyMovementDTO } from "@/application/dto/moneyMovementDTO";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";
import type { DataTableHeader } from "vuetify";

function toAllocationTable(
    allocations: MoneyAllocation[],
    movements: MoneyMovementDTO []
): OrderAllocationTableRow[] {
    const orAllocatoins = allocations.filter(o => !o.refundFor);

    return orAllocatoins.map(a => {
        const movement = movements.find(m => m.id === a.moneyMovementId);

        if(!movement) throw new Error(`Movement with id: ${a.moneyMovementId}, not found`);

        return {
            id: a.id,
            moneyMovementId: a.moneyMovementId,
            movementNumber: getMovementNumber(movement?.movementNumber ?? ""),
            amount: numberPriceToGreekFormatLocale(a.effectiveAmount),
            allocatedAt: getDate(a.allocatedAt),
            direction: movement.direction,
            method: movement.method,
            reason: movement.reason,
            reversals: getAllocationReversals(a.id, allocations)
        }
    });
}

function getAllocationReversals(
    allocationId: string, 
    allocations: MoneyAllocation[]
): OrderAllocatoinReversalTableRow[] {
    return allocations
            .filter(r => r.refundFor === allocationId)
            .map(r => ({
                amount: numberPriceToGreekFormatLocale(r.effectiveAmount),
                allocatedAt: getDate(r.allocatedAt)
            }))
}

function getMovementNumber(movementNumber: string): string {
    return `#${movementNumber}`;
}

function getDate(date?: Date): string {
    if(!date) return "-";

    return date.toLocaleDateString()
}

function getMovements(allocations: MoneyAllocation[]) {
    if(allocations.length === 0) return [];

    const movementStore = useMoneyMovementStore();

    const uniqueMovementIds = [
        ...new Set(allocations.map(a => a.moneyMovementId))
    ];

    return uniqueMovementIds
        .map(m => movementStore.getMoneyMovementById(m))
        .filter(m => m !== null && m !== undefined);
}

function getOrderAllocationHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('moneyMovement.title.number'), key: "movementNumber", align: 'start' },
        { title: tCap('order.title.allocatedAt'), key: "allocatedAt", align: 'start' },
        { title: tCap('moneyMovement.reason'), key: "reason", align: 'start' },
        { title: tCap('moneyMovement.method'), key: "method", align: 'start' },
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

export function useOrderAllocationsTable(allocationsRef: Ref<MoneyAllocation[] | undefined>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const allocations = allocationsRef.value ?? [];

        const movements = getMovements(allocations);

        if(movements.length === 0) return [];
        
        return toAllocationTable(allocations, movements);
    });

    const headers = computed(() => getOrderAllocationHeaders(tCap));

    const reversalHeaders = computed(() => getReversalHeaders(tCap));

    return { data, headers, reversalHeaders };
}

export interface OrderAllocationTableRow {
    id: string;
    moneyMovementId: string;
    movementNumber: string;
    amount: string;
    allocatedAt?: string;
    direction: MoneyDirection;
    method: PaymentMethod;
    reason: MoneyMovementReason;
    reversals: OrderAllocatoinReversalTableRow[]
}

export interface OrderAllocatoinReversalTableRow {
    allocatedAt?: string;
    amount: string;
}