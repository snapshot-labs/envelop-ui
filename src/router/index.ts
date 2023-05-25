import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Verify from '@/views/Verify.vue';
import Unsubscribe from '@/views/Unsubscribe.vue';
import Update from '@/views/Update.vue';

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/update',
      name: 'update',
      component: Update
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error-404',
      redirect: '/'
    }
  ]
});

export default router;
