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
  tracesSampleRate: parseFloat(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE),
  replaysSessionSampleRate: parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE),
  replaysOnErrorSampleRate: parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE)
});

app.use(router);
app.use(head);

app.mount('#app');
