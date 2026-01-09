import type { RouteRecordRaw } from 'vue-router';

export const partnerRoutes: RouteRecordRaw[] = [
    {
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
    }
];