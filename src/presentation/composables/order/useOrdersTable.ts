import { computed, type Ref } from "vue";

import { Order } from "@/domain/order/models/order";

import { useLocalizationHelpers } from "../useLocalization";
import type { DataTableHeader } from "vuetify";
import { Partner } from "@/domain/partner/models/partner";
import { getPartnerDetails } from "../partner/usePartnerDetails";
import type { OrderDirection, OrderStatus } from "@/domain/order/orderTypes";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";

function toOrderTable(order: Order, tCap: (key: string, count?: number) => string): OrderTableRow {
    return {
        id: order.id,
        orderNumber: getOrderNumber(order.orderNumber),
        partner: getPartnerDetails(order.partnerId),
        createdDate: getDate(order.createdDate),
        dueDate: getDate(order.dueDate),
        status: order.status,
        direction: order.direction,
        total: numberPriceToGreekFormatLocale(order.totalAmount)
    }
}

function getOrderNumber(orderNumber: string): string {
    return `#${orderNumber}`;
}

function getDate(date?: Date): string {
    if(!date) return "-";

    return date.toLocaleDateString()
}

function getOrderHeaders(tCap: (key: string, count?: number) => string) {
    return [
        { title: tCap('order.number'), key: "orderNumber", align: 'start' },
        { title: tCap('partner.businessName'), key: "partner", align: 'start' },
        { title: tCap('order.createdDate'), key: "createdDate", align: 'start' },
        { title: tCap('order.dueDate'), key: "dueDate", align: 'start' },
        { title: tCap('order.status'), key: "status", align: 'start' },
        { title: tCap('order.direction'), key: "direction", align: 'start' },
        { title: tCap('order.total'), key: "total", align: 'start' },  
        { title: tCap('common.action', 2), key: "actions", align: 'start'}
    ] satisfies DataTableHeader[];
}

export function useOrderTable(orderRef: Ref<Order[] | undefined>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const orders = orderRef.value ?? [];

        return orders.map(o => toOrderTable(o, tCap));
    });

    const headers = computed(() => getOrderHeaders(tCap));

    return { data, headers };
}

export interface OrderTableRow {
    id: string,
    orderNumber: string,
    partner?: Partner,
    createdDate: string,
    dueDate: string,
    status: OrderStatus,
    direction: OrderDirection,
    total: string
}