require("dotenv").config();
const { defineConfig } = require("cypress");
import { afterSpecHook } from 'cypress-qase-reporter/hooks';
module.exports = defineConfig({
  e2e: {
//Hier staan misschien al andere opties
    setupNodeEvents(on, config) {
      require('cypress-qase-reporter/plugin')(on, config)
      require('cypress-qase-reporter/metadata')(on)
      on('after:spec', async (spec, results) => {
        await afterSpecHook(spec, config);
      });
    },
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-qase-reporter',
    cypressQaseReporterReporterOptions: {
      debug: false, // For debugging for better insights
      testops: {
        api: {
          token: process.env.QASE_TESTOPS_API_TOKEN,
        },
        project: process.env.QASE_TESTOPS_PROJECT,
        uploadAttachments: true,
        run: {
          complete: true, // Ensure the run is marked as complete
        },
      },
      framework: {
        cypress: {
          screenshotsFolder: 'cypress/screenshots',
          videosFolder: 'cypress/videos',
          uploadDelay: 10,
        }
      }
    }
  }
});
