import type { RouteRecordRaw } from 'vue-router';

export const orderRoutes: RouteRecordRaw[] = [
    {
        path: '/orders',
        name: 'orders',
        component: () => import('@/presentation/views/orders/OrdersView.vue'),
    }
];