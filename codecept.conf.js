const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/auth_test.js',  // Only run auth tests
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://backend.ridervolt.app',  // Removed trailing slash
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
    }
  }
}