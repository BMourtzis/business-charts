import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/presentation/views/Home.vue'
import ChartView from '@/presentation/views/TestChart.vue'
import type { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/chart',
    name: 'about',
    component: ChartView,
  }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});