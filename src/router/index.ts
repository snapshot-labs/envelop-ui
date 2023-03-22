import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import VerifyView from '@/views/VerifyView.vue';
import UnsubscribeView from '@/views/UnsubscribeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyView
    },
    {
      path: '/unsubscribe',
      name: 'unsubscribe',
      component: UnsubscribeView
    }
  ]
});

export default router;
