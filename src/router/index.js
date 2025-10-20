import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TestChart from '@/views/TestChart.vue'

const routes = [
    {path: "/", component : Home},
    {path: "/chart", component : TestChart}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;