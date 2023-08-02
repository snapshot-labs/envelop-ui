import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

import * as dotenv from 'dotenv';

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    supportFile: false,
    baseUrl: `http://localhost:${process.env.PORT || '8085'}`,
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

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200
          launchOptions.preferences.width = 1400;
          launchOptions.preferences.height = 1200;
        }

        return launchOptions;
      });

      addMatchImageSnapshotPlugin(on, config);

      return config;
    }
  }
});
