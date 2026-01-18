import type { RouteRecordRaw } from 'vue-router';

export const orderRoutes: RouteRecordRaw[] = [
    {
        path: '/orders',
        name: 'orders',
        component: () => import('@/presentation/views/orders/OrdersView.vue'),
    }, {
        path: '/order/:id',
        name: 'orderDetails',
        component: () => import('@/presentation/views/orders/OrderDetails.vue'),
        props: true,
    }
];