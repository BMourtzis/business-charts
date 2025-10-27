import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TestChart from '@/views/TestChart.vue'
import LessonOne from '@/views/LessonOne.vue'

const routes = [
    {path: "/", component : Home},
    {path: "/chart", component : TestChart},
    {path: "/lesson1", component : LessonOne }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;