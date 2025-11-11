const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
require('dotenv').config(); // Add this to load environment variables from .env file

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/all_test.js',  // Only run auth tests
  output: './output',
  helpers: {
    REST: {
      endpoint: process.env['END-POINT'],  // Use environment variable with fallback
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'ridervolt-api-tests',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
      outputDir: './output/allure-results'
    }
  }
}