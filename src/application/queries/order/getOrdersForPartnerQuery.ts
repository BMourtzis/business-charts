import { useOrdersStore } from "@/presentation/stores/orderStore";
import { computed } from "vue";

export function getOrdersForPartner(partnerId: string) {
    const store = useOrdersStore();
    return computed(() => store.orders.filter(o => o.partnerId === partnerId));
}