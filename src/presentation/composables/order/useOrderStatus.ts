import { computed, type Ref } from "vue";

import type { Order } from "@/domain/order/models/order";
import { OrderStateTransitions, OrderStatus } from "@/domain/order/orderTypes";
import type { ActionDescriptor } from "@/presentation/types/types";
import { useLocalizationHelpers } from "../useLocalization";
import type { ApproveOrderInput } from "@/presentation/components/orders/OrderDetailsHeaderStatus.vue";
import { ApproveOrderCommandHandler, type ApproveOrderCommand } from "@/application/commands/order/approveOrderCommand";


export function useOrderStatus(order: Ref<Order>) {
    const availableStatuses = computed(() => getAvailableActions(order.value.status));

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
        if(!canMoveStatusTo(availableStatuses.value, OrderStatus.Approved)) return null;

        return {
            id: "approve",
            title: tCap('order.approveBtn'),
            color: "indigo",
            execute: async (input) => { 
                const cmd = {
                    orderId: order.value.id
                } as ApproveOrderCommand;

                if(input?.amount && input.amount > 0 && input?.method) {
                    cmd.deposit = {
                        amount: input.amount,
                        method: input.method
                    };
                }

                await new ApproveOrderCommandHandler().handle(cmd);
            }
        }
    }

    function getProcessingBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses.value, OrderStatus.Processing)) return null;

        return {
            id: "processing",
            title: tCap('order.processingBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    function getReadyForShipmentBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses.value, OrderStatus.ReadyForShipment)) return null;

        return {
            id: "readyForShipment",
            title: tCap('order.readyForShipmentBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    function getShippedBtnOptions(): ActionDescriptor | null {
        if(!canMoveStatusTo(availableStatuses.value, OrderStatus.Shipped)) return null;

        return {
            id: "shipped",
            title: tCap('order.shippedBtn'),
            color: "indigo",
            execute: async () => {}
        }
    }

    return {
        mainBtnOptions: computed(() => getMainButtonOptions()),
        canCancel: computed(() => canMoveStatusTo(availableStatuses.value, OrderStatus.Cancelled)),
        canComplete: computed(() => canMoveStatusTo(availableStatuses.value, OrderStatus.Completed))
    };
}

function getAvailableActions(orderStatus: OrderStatus) {
    return OrderStateTransitions[orderStatus];
}

function canMoveStatusTo(availableStatuses: OrderStatus[], status: OrderStatus) {
    return availableStatuses.includes(status);
}