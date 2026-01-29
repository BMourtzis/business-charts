import type { RouteRecordRaw } from 'vue-router';

export const moneyMovementRoutes: RouteRecordRaw[] = [
    {
        path: '/moneyMovements',
        name: 'moneyMovements',
        component: () => import('@/presentation/views/moneyMovement/MoneyMovementView.vue'),
    }, 
    {
        path: '/moneyMovements/:id',
        name: 'moneyMovementsDetails',
        component: () => import('@/presentation/views/moneyMovement/MoneyMovementDetails.vue'),
        props: true,
    }
];