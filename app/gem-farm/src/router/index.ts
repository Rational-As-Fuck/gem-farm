import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Farmer from '@/views/Farmer.vue';
import Manager from '@/views/Manager.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manager',
    name: 'Farm Manager',
    component: Manager,
  },
  {
    path: '/farmer',
    name: 'Farmer',
    component: Farmer,
  },
  {
    path: '/clones',
    component: Farmer,
    props: {
      collectionName: 'Overlord Clones',
      farmAddress: '9PJD3XVpq7fySsQKAMZEb97272U16GCngGqXRuYiktN4"',
    },
  },
  {
    path: '/overlords',
    component: Farmer,
    props: {
      collectionName: 'Unique Overlords',
      farmAddress: 'GffFVEQHbuyvMZgZLAWYeqvDcTej8F3PzA4A2kFbqnMs',
    },
  },
  {
    path: '/chimps',
    component: Farmer,
    props: {
      collectionName: 'Meta Chimps',
      farmAddress: '3owWkikZXpWGdmhQf3xhaYf8GMPRr2b9EjSmXQFZ2Vp4',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
