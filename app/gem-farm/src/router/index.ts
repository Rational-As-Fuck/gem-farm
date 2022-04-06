import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Farmer from '@/views/Farmer.vue';
import Manager from '@/views/Manager.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/farmer'
  },
  {
    path: '/manager',
    name: 'Farm Manager',
    component: Manager,
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

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/manager',
//     name: 'Farm Manager',
//     component: Manager,
//   },
//   {
//     path: '/farmer',
//     name: 'Farmer',
//     component: Farmer,
//   },
//   {
//     path: '/clones',
//     name: 'clones',
//     component: Farmer,
//     props: {
//       collectionName: 'Overlord Clones',
//       farmAddress: 'HJVe9iwgA4NEZT2MpHPCkPYpFXxJZXFSzNi3GTwabRx9"',
//     },
//   },
//   {
//     path: '/uniques',
//     name: 'uniques',
//     component: Farmer,
//     props: {
//       collectionName: 'Unique Overlords',
//       farmAddress: 'FhmRrvxm1aiWRwgALMXJnPKBAzBjVox4Gkxi2RawbFYU',
//     },
//   },
//   {
//     path: '/chimps',
//     name: 'chimps',
//     component: Farmer,
//     props: {
//       collectionName: 'Meta Chimps',
//       farmAddress: '5JNBJBUYFzCmF9vJVea6cwXabp1dCQ8PRtsMRARMfPdv',
//     },
//   },
// ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
