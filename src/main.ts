import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { initSentry } from './sentry';

import App from '@/App.vue';
import router from '@/router';

import '@/style.scss';

const app = createApp(App);
const head = createHead();

initSentry(app, router);

app.use(router);
app.use(head);

app.mount('#app');
