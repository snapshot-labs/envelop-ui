import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from 'unhead';

import App from '@/App.vue';
import router from '@/router';

import '@/assets/style.scss';

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);

app.mount('#app');
