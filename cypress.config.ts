import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      dotenv.config();

      config.env = {
        ...config.env,
        ...Object.fromEntries(
          Object.keys(process.env)
            .filter(k => k.startsWith('VITE_'))
            .map(k => [k, process.env[k]])
        )
      };

      return config;
    }
  }
});
