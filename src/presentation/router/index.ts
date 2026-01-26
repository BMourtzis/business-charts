import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';
import { partnerRoutes } from './partnerRoutes';
import { carrierRoutes } from './carrierRoutes';
import { orderRoutes } from './orderRoutes';
import { optionRoutes } from './optionRoutes';
import { moneyMovementRoutes } from './moneyMovementRoutes'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/presentation/views/HomeView.vue'),
    }, {
        path: '/chart',
        name: 'chart',
        component: () => import('@/presentation/views/TestChart.vue'),
    }, 
    ...partnerRoutes,
    ...carrierRoutes,
    ...orderRoutes,
    ...optionRoutes,
    ...moneyMovementRoutes
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});