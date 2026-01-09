import { useOrdersStore } from "@/presentation/stores/orderStore";
import { computed } from "vue";

export function getOrderById(id: string) {
    const store = useOrdersStore();
    return computed(() => store.orders.find(o => o.id === id));
}