import { computed, type Ref } from "vue";

import type { MoneyAllocation } from "@/domain/order/models/moneyAllocation";
import type { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";

import { useLocalizationHelpers } from "../useLocalization";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import type { MoneyMovementDTO } from "@/application/dto/moneyMovementDTO";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";
import type { DataTableHeader } from "vuetify";


function toAllocationTable(
    allocation: MoneyAllocation, 
    movements: MoneyMovementDTO[]
): OrderAllocationTableRow | null {
    const movement = movements.find(m => m.id === allocation.moneyMovementId);
    if(!movement) return null;

    return {
        moneyMovementId: allocation.moneyMovementId,
        movementNumber: getMovementNumber(movement?.movementNumber),
        amount: numberPriceToGreekFormatLocale(allocation.amount),
        allocatedAt: getDate(allocation.allocatedAt),
        direction: movement.direction,
        method: movement.method,
        reason: movement.reason
    }
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
        { title: tCap('moneyMovement.number'), key: "movementNumber", align: 'start' },
        { title: tCap('order.allocatedAt'), key: "allocatedAt", align: 'start' },
        { title: tCap('moneyMovement.reason'), key: "reason", align: 'start' },
        { title: tCap('moneyMovement.method'), key: "method", align: 'start' },
        { title: tCap('moneyMovement.amount'), key: "amount", align: 'start' },
    ] satisfies DataTableHeader[];
}

export function useOrderAllocationsTable(allocationsRef: Ref<MoneyAllocation[] | undefined>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const allocations = allocationsRef.value ?? [];

        const movements = getMovements(allocations);

        return allocations
            .map(a => toAllocationTable(a, movements))
            .filter(a => a !== null && a !== undefined);
    });

    const headers = computed(() => getOrderAllocationHeaders(tCap));

    return { data, headers};
}

export interface OrderAllocationTableRow {
    moneyMovementId: string;
    movementNumber: string;
    amount: string;
    allocatedAt?: string;
    direction: MoneyDirection;
    method: PaymentMethod;
    reason: MoneyMovementReason;
}