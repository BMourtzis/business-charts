import type { RouteRecordRaw } from 'vue-router';

export const optionRoutes: RouteRecordRaw[] = [
    {
        path: '/data-transfer',
        name: 'dataTransfer',
        component: () => import('@/presentation/views/DataTransfer.vue'),
    }, {
        path: '/change-password',
        name: 'changePassword',
        component: () => import('@/presentation/views/ChangePassword.vue'),
    }
];