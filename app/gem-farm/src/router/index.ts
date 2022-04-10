import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Farmer from '@/views/Farmer.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/farmer'
  },
  {
    path: '/farmer',
    name: 'Vault Owner',
    component: Farmer,
  },
  {
    path: '/:col',
    name: 'collection',
    component: Farmer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
