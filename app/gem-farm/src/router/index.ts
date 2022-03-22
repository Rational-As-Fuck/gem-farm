import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Farmer from '@/views/Farmer.vue';
import Manager from '@/views/Manager.vue';
import Home from '@/views/Home.vue';
import HomeView from "../views/HomeView.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/newHome',
    name: 'NewHome',
    component: HomeView,
  },
  {
    path: "/:col",
    name: "collections",
    component: () =>
      import(
        /* webpackChunkName: "collections" */ "../views/CollectionsView.vue"
      ),
    children: [
      {
        path: "staked",
        name: "staked",
        component: () =>
          import(/* webpackChunkName: "staked" */ "../views/StakedView.vue"),
      },
      {
        path: "unstaked",
        name: "unstaked",
        component: () =>
          import(
            /* webpackChunkName: "unstaked" */ "../views/UnstakedView.vue"
          ),
      },
    ],

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
