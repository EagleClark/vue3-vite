import { createRouter, createWebHistory } from 'vue-router';

const AppHome = () => import('../bussiness/home/index.vue');
const HelloWorld = () => import('../components/HelloWorld.vue');
const NotFound = () => import('../components/NotFound.vue');

const routes = [
  { path: '/', component: AppHome },
  { path: '/home', component: HelloWorld },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 路由守卫
  console.log(to, from);
});

router.afterEach((to, from) => {
  // 路由守卫
  console.log(to, from);
});
