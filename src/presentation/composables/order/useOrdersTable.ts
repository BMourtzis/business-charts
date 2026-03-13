import { computed, type ComputedRef, type Ref } from "vue";

import { Order } from "@/domain/order/models/order";

import { useLocalizationHelpers } from "../useLocalization";
import type { DataTableHeader } from "vuetify";
import { Partner } from "@/domain/partner/models/partner";
import { getPartnerDetails } from "../partner/usePartnerDetails";
import { OrderStatus, statusHierarchy, type OrderType } from "@/domain/order/orderTypes";
import { numberPriceToGreekFormatLocale } from "@/utlis/priceUtils";

function toOrderTable(order: Order): OrderTableRow {
    return {
        id: order.id,
        orderNumber: getOrderNumber(order.orderNumber),
        partner: getPartnerDetails(order.partnerId),
        createdDate: getDate(order.createdDate),
        dueDate: getDate(order.dueDate),
        status: order.status,
        type: order.type,
        total: numberPriceToGreekFormatLocale(order.totalAmount),
        order: order
    };
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
        { title: tCap('order.title.orderNumber'), key: "orderNumber", align: 'start' },
        { title: tCap('partner.partner'), key: "partner", align: 'start' },
        { title: tCap('order.title.createdDate'), key: "createdDate", align: 'start' },
        { title: tCap('order.title.dueDate'), key: "dueDate", align: 'start' },
        { title: tCap('order.status'), key: "status", align: 'start', sort: statusSort },
        { title: tCap('order.type'), key: "direction", align: 'start' },
        { title: tCap('order.total'), key: "total", align: 'start' },
        { title: tCap('common.action', 2), key: "actions", align: 'start'}
    ] satisfies DataTableHeader[];
}

function filterOrders(orders: Order[], filters?: OrderTableFilters) {
    if(!orders || orders.length === 0) return [];
    if(!filters) return orders;

    let filtered = orders;

    if(filters.status.length > 0) {
        filtered = filtered.filter(o => 
            filters.status.includes(o.status)
        );
    } 
    // else {
    //     filtered = filtered.filter(o => 
    //         defaultStatusFilter.includes(o.status)
    //     );
    // }

    if(filters.partner.length > 0) {
        filtered = filtered.filter(o => 
            filters.partner.includes(o.partnerId)
        );
    }

    if(filters.type) {
        filtered = filtered.filter(o => 
            o.type === filters.type
        );
    }
    
    return filtered;
}

function statusSort(a: OrderStatus, b: OrderStatus) {
    const aOrder = statusHierarchy[a];
    const bOrder = statusHierarchy[b];

    return aOrder - bOrder;
}

const defaultStatusFilter = [
  OrderStatus.Draft, 
  OrderStatus.Approved, 
  OrderStatus.Processing, 
  OrderStatus.ReadyForShipment, 
  OrderStatus.Shipped
];

export function useOrderTable(orderRef: Ref<Order[] | undefined>, filters: Ref<OrderTableFilters>) {
    const { tCap } = useLocalizationHelpers();

    const data = computed(() => {
        const orders = orderRef.value ?? [];

        const filteredOrders = filterOrders(orders, filters.value);

        return filteredOrders.map(o => toOrderTable(o));
    });

    const headers = computed(() => getOrderHeaders(tCap));

    return { data, headers };
}

export interface OrderTableFilters {
    status: OrderStatus[];
    partner: string[];
    type?: OrderType;
}

export interface OrderTableRow {
    id: string,
    orderNumber: string,
    partner?: Partner,
    createdDate: string,
    dueDate: string,
    status: OrderStatus,
    type: OrderType,
    total: string,
    order: Order
}