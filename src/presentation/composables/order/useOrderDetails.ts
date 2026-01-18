import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { Order } from "@/domain/order/models/order";
import { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";
import { useOrdersStore } from "@/presentation/stores/orderStore";
import { computed } from "vue";

export function useOrderDetails(id: string) {
    const store = useOrdersStore();

    const dto = computed(() => store.getOrderById(id));

    const model = computed(() => {
        const order = dto.value;

        if(!order) return undefined;

        return OrderMapperInstance.toModel(order);
    })

    return { dto, model };
}

export function statusColor(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.Draft:
            return "indigo";
        case OrderStatus.Cancelled:
            return "red";
        case OrderStatus.Approved:
        case OrderStatus.Processing:
        case OrderStatus.ReadyForShipment:
        case OrderStatus.Shipped:
            return "warning";
        case OrderStatus.Completed:
        default:
            return "grey";
        
    }
}

export function getDate(date: Date) {
    return date.toLocaleDateString()
}

export function getAmount(amount: number): string {
    return `${amount.toFixed(2)}€`
}

export function getStatusString(status: OrderStatus, tCap: (key: string, count?: number) => string): string {
    switch(status) {
        case OrderStatus.Draft:
            return tCap("order.draft");
        case OrderStatus.Cancelled:
            return tCap("order.cancelled");
        case OrderStatus.Approved:
            return tCap("order.approved");
        case OrderStatus.Processing:
            return tCap("order.processing");
        case OrderStatus.ReadyForShipment:
            return tCap("order.readyForShipment");
        case OrderStatus.Shipped:
            return tCap("order.shipped");
        case OrderStatus.Completed:
            return tCap("order.completed");
    }
}

export function getDirectionString(direction: OrderDirection, tCap: (key: string, count?: number) => string): string {
    switch(direction) {
        case OrderDirection.Credit:
            return tCap("common.credit");
        case OrderDirection.Debit:
            return tCap("common.debit");
    }
}