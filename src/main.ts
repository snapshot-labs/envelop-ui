import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import * as Sentry from '@sentry/vue';

import App from '@/App.vue';
import router from '@/router';

import '@/style.scss';

const app = createApp(App);
const head = createHead();

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.5,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

app.use(router);
app.use(head);

app.mount('#app');
