import { MoneyDirection, MoneyMovementReason, PaymentMethod } from "@/domain/payment/MoneyMovementTypes";
import { useLocalizationHelpers } from "../useLocalization";
import { computed } from "vue";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";
import { useOrdersStore } from "@/presentation/stores/orderStore";

export function useMoneyMovementDetails(id: string) {
    const store = useMoneyMovementStore();

    const dto = computed(() => store.getMoneyMovementById(id));

    const model = computed(() => {
        const movement = dto.value;

        if(!movement) return undefined;

        return MoneyMovementMapperInstance.toModel(movement);
    });

    return {dto, model};
}

export function getMoneyMovementAllocations(moneyMovementId: string, partnerId: string) {
    const orderStore = useOrdersStore();
    return computed(() => orderStore.getOrdersByMovmementId(moneyMovementId, partnerId));
}

export function getMoneyMovementAllocatedAmount(moneyMovementId: string, partnerId: string) {
    const orders = getMoneyMovementAllocations(moneyMovementId, partnerId);

    return computed(() => orders.value.reduce((orderAcc, order) => {
        return (orderAcc + order.allocations
            .reduce((allocAcc, alloc) => allocAcc + alloc.amount, 0)
        )
    }, 0));
}

export function useMoneyMovementTypes() {
    const { tCap } = useLocalizationHelpers();

    return {
        paymentMethodTypes: computed(() => getPaymentMethodTypes(tCap)),
        moneyDirectionTypes: computed(() => getMoneyDirectionTypes(tCap)),
        movementReasonTypes: computed(() => getMovementReasonTypes(tCap))
    }
}


function getPaymentMethodTypes(tCap: (key: string) => string) {
    return Object.values(PaymentMethod).map(method => ({
        title: getPaymentMethodString(method, tCap),
        value: method,
        icon: getPaymentMethodIcon(method)
    }));
}

export function getPaymentMethodString(method: PaymentMethod, tCap: (key: string, count?: number) => string): string {
    return tCap(`moneyMovement.${method.toLowerCase()}`)
}

export function getPaymentMethodIcon(method: PaymentMethod): string {
    switch(method) {
        case PaymentMethod.Card:
            return "mdi-credit-card";
        case PaymentMethod.Bank:
            return "mdi-bank";
        case PaymentMethod.Cash:
            return "mdi-cash";
        case PaymentMethod.Online:
            return "mdi-web";
        case PaymentMethod.Cheque:
            return "mdi-checkbook";
    }
}

function getMoneyDirectionTypes(tCap: (key: string) => string) {
    return Object.values(MoneyDirection).map(direction => ({
        title: getMoneyDirectionString(direction, tCap),
        value: direction,
        icon: getMoneyDirectionIcon(direction)
    }));
}

export function getMoneyDirectionString(direction: MoneyDirection, tCap: (key: string, count?: number) => string): string {
    return tCap(`moneyMovement.${direction.toLowerCase()}`)
}

export function getMoneyDirectionIcon(direction: MoneyDirection): string {
    switch(direction) {
        case MoneyDirection.In:
            return "mdi-import";
        case MoneyDirection.Out:
            return "mdi-export";
    }
}

export function getMoneyDirectionColour(direction: MoneyDirection): string {
    switch(direction) {
        case MoneyDirection.In:
            return "green";
        case MoneyDirection.Out:
            return "red";
    }
}

function getMovementReasonTypes(tCap: (key: string) => string) {
    return Object.values(MoneyMovementReason).map(reason => ({
        title: getMovementReasonString(reason, tCap),
        value: reason
    }));
}

export function getMovementReasonString(
    reason: MoneyMovementReason, 
    tCap: (key: string, count?: number) => string
): string {
    return tCap(`moneyMovement.${reason.toLowerCase()}`);
}