import type { Order } from "@/domain/order/models/order";
import { OrderStateTransitions, OrderStatus } from "@/domain/order/orderTypes";
import type { ActionDescriptor } from "@/presentation/types/types";
import { useLocalizationHelpers } from "../useLocalization";
import type { ApproveOrderInput } from "@/presentation/components/orders/OrderDetailsHeaderStatus.vue";

export function useOrderStatus(order: Order) {
    const availableStatuses = getAvailableActions(order.status);

    const { tCap } = useLocalizationHelpers();

    function getMainButtonOptions() {
        const optionsList = [
            getApprovalBtnOptions(),
            getProcessingBtnOptions(),
            getReadyForShipmentBtnOptions(),
            getShippedBtnOptions(),
        ].filter(o => o !== null);

        const [first, ...rest] = optionsList;

        return {
            mainBtnOptions: first,
            menuOptions: rest
        }
    }

    function getApprovalBtnOptions(): ActionDescriptor<ApproveOrderInput> | null {
        if(!canMoveStatusTo(availableStatuses, OrderStatus.Approved)) return null;

        return {
            id: "approve",
            title: tCap('order.approveBtn'),
            color: "indigo",
            execute: async (input) => { }
        }
    }

    function getProcessingBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses, OrderStatus.Processing)) return null;

        return {
            id: "processing",
            title: tCap('order.processingBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    function getReadyForShipmentBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses, OrderStatus.ReadyForShipment)) return null;

        return {
            id: "readyForShipment",
            title: tCap('order.readyForShipmentBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    function getShippedBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses, OrderStatus.Shipped)) return null;

        return {
            id: "shipped",
            title: tCap('order.shippedBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    return {
        mainBtnOptions: getMainButtonOptions(),
        canCancel: canMoveStatusTo(availableStatuses, OrderStatus.Cancelled),
        canComplete:canMoveStatusTo(availableStatuses, OrderStatus.Completed)
    }
}

function getAvailableActions(orderStatus: OrderStatus) {
    return OrderStateTransitions[orderStatus];
}

function canMoveStatusTo(availableStatuses: OrderStatus[], status: OrderStatus) {
    return availableStatuses.includes(status);
}