import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Verify from '@/views/Verify.vue';
import Unsubscribe from '@/views/Unsubscribe.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    },
    {
      path: '/unsubscribe',
      name: 'unsubscribe',
      component: Unsubscribe
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error-404',
      redirect: '/'
    }
  ]
});

export default router;
