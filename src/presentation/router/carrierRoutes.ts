import type { RouteRecordRaw } from 'vue-router';

export const carrierRoutes: RouteRecordRaw[] = [
    {
        path: '/carriers',
        name: 'deliveryCarriers',
        component: () => import('@/presentation/views/deliveryCarrier/DeliveryCarrierView.vue'),
    }, {
        path: '/carrier/:id',
        name: 'deliveryCarrierDetails',
        component: () => import('@/presentation/views/deliveryCarrier/DeliveryCarrierDetails.vue'),
        props: true,
    }
];