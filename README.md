# RiderVolt API Tests

This repository contains automated API tests for the RiderVolt backend application using CodeceptJS.

## Overview

RiderVolt API Tests is a test suite designed to validate the functionality and reliability of the RiderVolt backend API endpoints. The tests focus on authentication flows, user management, and other critical API functionalities.

## Features

- Comprehensive authentication testing
- REST API request validation
- Automatic test reporting with detailed Allure reports
- Modular test organization
- Environment-based configuration for secure testing

## Technology Stack

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [CodeceptJS](https://codecept.io/) - End-to-end testing framework
- [REST Helper](https://codecept.io/helpers/REST/) - API testing support for CodeceptJS
- [Allure](https://docs.qameta.io/allure/) - Test report generator

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ridervolt-api-tests.git
   cd ridervolt-api-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

The tests are configured to run against the RiderVolt backend API using environment variables for security.

1. Create a `.env` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Edit your `.env` file with actual values:
   ```
   END-POINT=https://your-actual-api-endpoint.com
   USERNAME-LOGIN-SUCCESS=your-actual-username
   PASSWORD-LOGIN-SUCCESS=your-actual-password
   ```

> **IMPORTANT**: Never commit your `.env` file with actual credentials to the repository. The `.gitignore` file is already set up to exclude it.

The configuration in `codecept.conf.js` uses these environment variables:

```javascript
helpers: {
  REST: {
    endpoint: process.env['END-POINT'],
    // other configuration...
  }
}
    endpoint: 'Replace with your API endpoint', // 
    defaultHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}
```

### Running Tests

To run all tests:

```bash
npm test
```

To run only authentication tests:

```bash
npm run test:auth
```

To run tests with Allure reporting:

```bash
npm run test:allure
npm run allure:report
npm run allure:open
```

## Test Structure

The tests are organized into different files by functionality:

- `auth_test.js` - Tests for authentication endpoints (login, registration, password reset)
- `users_test.js` - Tests for user profile and management endpoints

## Authentication Tests

The authentication tests cover:

- Login with valid credentials
- Login with invalid credentials
- Login with missing credentials
- Registration process
- Password reset functionality
- Token validation

## Extending the Tests

To add new tests:

1. Create a new test file in the `tests` directory (e.g., `payments_test.js`)
2. Structure your test using the CodeceptJS syntax:
   ```javascript
   Feature('Payment API');

   Scenario('Process payment', async ({ I }) => {
     // Your test code here
   });
   ```

3. Run your new tests with:
   ```bash
   npx codeceptjs run --grep "Payment API"
   ```

## Best Practices for API Testing

- Keep tests independent from each other
- Clean up test data after tests run
- Use descriptive scenario names
- Validate both successful and error responses
- Test edge cases and boundary conditions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the `package.json` file for details.

## Acknowledgments

- [CodeceptJS Documentation](https://codecept.io/helpers/REST/)
- [REST API Testing Best Practices](https://restfulapi.net/testing-restful-services/)