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
        component: () => import('@/presentation/views/partners/SuppliersView.vue'),
    }, {
        path: '/customers',
        name: 'customers',
        component: () => import('@/presentation/views/partners/CustomersView.vue'),
    }, {
        path: '/partner/:id',
        name: 'partner-details',
        component: () => import('@/presentation/views/partners/PartnerDetails.vue'),
        props: true,
    }, {
        path: '/lessons/lesson1',
        name: 'lessonOne',
        component: () => import('@/presentation/views/lessons/LessonOne.vue'),
    }, {
        path: '/lessons/lesson2',
        name: 'lessonTwo',
        component: () => import('@/presentation/views/lessons/LessonsTwo.vue'),
    }, {
        path: '/lessons/lesson3',
        name: 'lessonThree',
        component: () => import('@/presentation/views/lessons/LessonThree.vue'),
    }, {
        path: '/lessons/lesson4',
        name: 'lessonFour',
        component: () => import('@/presentation/views/lessons/LessonFour.vue'),
    }, {
        path: '/lessons/lesson5',
        name: 'lessonFive',
        component: () => import('@/presentation/views/lessons/LessonFive.vue'),
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});