import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/presentation/views/HomeView.vue'),
    }, {
        path: '/chart',
        name: 'chart',
        component: () => import('@/presentation/views/TestChart.vue'),
    }, {
        path: '/suppliers',
        name: 'suppliers',
        component: () => import('@/presentation/views/partner/SuppliersView.vue'),
    }, {
        path: '/b2b-customers',
        name: 'b2bCustomers',
        component: () => import('@/presentation/views/partner/B2BCustomersView.vue'),
    }, {
        path: '/partner/:id',
        name: 'partnerDetails',
        component: () => import('@/presentation/views/partner/PartnerDetails.vue'),
        props: true,
    }, {
        path: '/orders',
        name: 'orders',
        component: () => import('@/presentation/views/orders/OrdersView.vue'),
    }, {
        path: '/carriers',
        name: 'deliveryCarriers',
        component: () => import('@/presentation/views/deliveryCarrier/DeliveryCarrierView.vue'),
    }, {
        path: '/carrier/:id',
        name: 'deliveryCarrierDetails',
        component: () => import('@/presentation/views/deliveryCarrier/DeliveryCarrierDetails.vue'),
        props: true,
    }, {
        path: '/data-transfer',
        name: 'dataTransfer',
        component: () => import('@/presentation/views/DataTransfer.vue'),
    }, {
        path: '/change-password',
        name: 'changePassword',
        component: () => import('@/presentation/views/ChangePassword.vue'),
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});