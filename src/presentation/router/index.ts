import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/presentation/views/Home.vue'),
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
        name: 'b2b-customers',
        component: () => import('@/presentation/views/partner/B2BCustomersView.vue'),
    }, {
        path: '/partner/:id',
        name: 'partner-details',
        component: () => import('@/presentation/views/partner/PartnerDetails.vue'),
        props: true,
    }, {
        path: '/data-transfer',
        name: 'data-transfer',
        component: () => import('@/presentation/views/DataTransfer.vue'),
    }
];

export const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_URL),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});