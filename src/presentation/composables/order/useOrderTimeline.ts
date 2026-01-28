import type { Order } from "@/domain/order/models/order";
import { OrderStatus } from "@/domain/order/orderTypes";
import { useLocalizationHelpers } from "../useLocalization";
import { computed, type Ref } from "vue";

export function useOrderTimeline(order: Ref<Order>) {
    const { tCap } = useLocalizationHelpers();

    const TIMELINE_STEPS: TimelineStep[] = [
        {
            name: "created",
            title: tCap('order.createdDate'),
            getDate: o => o.createdDate
        },
        {
            name: "apporved",
            title: tCap('order.approvedDate'),
            getDate: o => o.approvedDate
        },
        {
            name: "shipped",
            title: tCap('order.shippedDate'),
            getDate: o => o.shippedDate
        },
        {
            name: "completed",
            title: tCap('order.completedDate'),
            getDate: o => o.completedDate
        }
    ];

    const CANCELLED_STEP: TimelineStep = {
        name: "cancelled",
        title: tCap('order.cancelledDate'),
        getDate: o => o.cancelledDate,
        isCancelled: true
    };

    return {
        timelineItems: computed(() => buildOrderTimeline(order.value, TIMELINE_STEPS, CANCELLED_STEP))
    };
}


function buildOrderTimeline(
    order: Order, 
    timelineSteps: TimelineStep[], 
    cancelledSetp: TimelineStep
): TimelineItem[] {
    const baseSteps = [...timelineSteps]

    // Add cancelled only if it happened
    if (order.status === OrderStatus.Cancelled) {
        baseSteps.push(cancelledSetp)
    }

    let withDates = baseSteps.map(step => ({
        name: step.name,
        title: step.title,
        date: step.getDate(order)
    }));

    if(order.status === OrderStatus.Cancelled) {
        withDates = withDates
            .filter(s => s.date);
    }

    // Find last step that has a date
    const lastDatedIndex = withDates
        .map(s => s.date)
        .findLastIndex(d => d !== undefined);

    return withDates.map((step, index) => {
        // Cancelled terminal step
        if (
            order.status === OrderStatus.Cancelled &&
            step.name === 'cancelled'
        ) {
            return {
                ...step,
                colour: "red"
            }
        }

        // Pending (no date yet)
        if (!step.date) {
            return {
                ...step,
                colour: "grey"
            }
        }

        // Done vs current
        return {
            ...step,
            colour: index === lastDatedIndex ? "indigo" : "cyan"
        }
    })
}

type TimelineStep = {
    title: string,
    name: "created" | "apporved" | "shipped" | "cancelled" | "completed",
    getDate: (o: Order) => Date | undefined
    isCancelled?: boolean
};

export type TimelineItem = {
    title: string,
    name: "created" | "apporved" | "shipped" | "cancelled" | "completed",
    date?: Date
    colour: "cyan" | "indigo" | "red" | "grey"
}