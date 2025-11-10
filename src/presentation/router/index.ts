import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/presentation/views/Home.vue'),
    }, {
        path: '/chart',
        name: 'about',
        component: () => import('@/presentation/views/TestChart.vue'),
    }, {
        path: '/suppliers',
        name: 'suppliers',
        component: () => import('@/presentation/views/partner/SuppliersView.vue'),
    }, {
        path: '/customers',
        name: 'customers',
        component: () => import('@/presentation/views/partner/CustomersView.vue'),
    }, {
        path: '/partner/:id',
        name: 'partner-details',
        component: () => import('@/presentation/views/partner/PartnerDetails.vue'),
        props: true,
    }, {
        path: '/lessons/lesson1',
        name: 'lessonOne',
        component: () => import('@/presentation/views/lesson/LessonOne.vue'),
    }, {
        path: '/lessons/lesson2',
        name: 'lessonTwo',
        component: () => import('@/presentation/views/lesson/LessonsTwo.vue'),
    }, {
        path: '/lessons/lesson3',
        name: 'lessonThree',
        component: () => import('@/presentation/views/lesson/LessonThree.vue'),
    }, {
        path: '/lessons/lesson4',
        name: 'lessonFour',
        component: () => import('@/presentation/views/lesson/LessonFour.vue'),
    }, {
        path: '/lessons/lesson5',
        name: 'lessonFive',
        component: () => import('@/presentation/views/lesson/LessonFive.vue'),
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});