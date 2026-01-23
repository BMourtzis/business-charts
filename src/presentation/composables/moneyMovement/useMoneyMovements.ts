import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";
import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { useMoneyMovementStore } from "@/presentation/stores/moneyMovementStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export function useMoneyMovements() {
    const store = useMoneyMovementStore();
    const { allMovements } = storeToRefs(store);

    return {
        allMoneyMovements: computed(() => 
            allMovements.value.map(MoneyMovementMapperInstance.toModel) as MoneyMovement[])
    };
}