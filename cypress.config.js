const { defineConfig } = require("cypress")
const { allureCypress } = require("allure-cypress/reporter")
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse")
const dotenv = require('dotenv')

const env = dotenv.config().parsed // Load environment variables from .env
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com/challenging_dom", // Use the variable from .env or default value
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on, config) {
      // Setup for Performance
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on("task", {
        lighthouse: lighthouse()
      })

      // Setup for Allure
      allureCypress(on, {
        resultsDir: "./allure-results"
      })

      // Additional setup for Node events
      config.screenshotOnRunFailure = true // Enable screenshot on test failure
      config.video = true // Enable video recording
      config.watchForFileChanges = false // Disable watching for file changes

      return {
        ...config,
        env // Return the env object with variables
      } // Return the modified config object
    },
    experimentalStudio: true, // Enable experimental Studio mode
    defaultCommandTimeout: 10000, // Set default command timeout
    experimentalModifyObstructiveThirdPartyCode: true, // Enable Stripe
    pageLoadTimeout: 30000, // Set page load timeout
    responseTimeout: 30000, // Set response timeout
    chromeWebSecurity: false, // Disable Chrome web security
    viewportWidth: 1920, // Set viewport width
    viewportHeight: 1080, // Set viewport height
    videosFolder: 'cypress/videos', // Specify the folder for video storage
    screenshotsFolder: 'cypress/screenshots' // Specify the folder for screenshots storage
  },
  env: {
    API_URL: env.API_URL, // Use API_URL from .env
    API_KEY: env.API_KEY, // Use API_KEY from .env
    BASE_URL: env.BASE_URL // Use BASE_URL from .env
  }
})