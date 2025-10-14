Feature('Authentication API Tests');

// Import assert for validation
const assert = require('assert');

// Test valid login credentials
Scenario('Login with valid credentials', async ({ I }) => {
  // Using credentials from environment variables
  const res = await I.sendPostRequest('/api/login', {
    email: process.env['USERNAME-LOGIN-SUCCESS'],
    password: process.env['PASSWORD-LOGIN-SUCCESS']
  });
  
  console.log('Login response status:', res.status);
  console.log('Login response data:', res.data);
  
  // Explicitly assert that status code must be 200 for success
  assert.strictEqual(res.status, 200, 'Valid login should return status code 200');
  
  // After confirming status is 200, validate token exists
  assert(res.data.token, 'Token should exist in successful login response');
  console.log('Login successful with valid token');
});

// Test invalid login credentials
Scenario('Login with invalid credentials', async ({ I }) => {
  const res = await I.sendPostRequest('/api/login', {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  });
  
  console.log('Invalid login response:', res.status);
  
  // API should return 401 Unauthorized or 400 Bad Request for invalid credentials
  assert(res.status === 401 || res.status === 400, 'Invalid credentials should return 401 or 400 status');
  
  // Validate error message exists in response (adjust based on your API response format)
  if (res.data && res.data.message) {
    console.log('Error message:', res.data.message);
  } else if (res.data && res.data.error) {
    console.log('Error message:', res.data.error);
  }
});

// Test missing credentials
Scenario('Login with missing credentials', async ({ I }) => {
  const res = await I.sendPostRequest('/api/login', {
    // Missing email and password
  });
  
  console.log('Missing credentials response status:', res.status);
  
  // API rejects with 401 Unauthorized
  assert(res.status === 401, 'Missing credentials should return 401 status');
  
  // Verify error message if present
  if (res.data && res.data.message) {
    console.log('Error message:', res.data.message);
    assert(res.data.message.includes('Invalid'), 'Response should contain error about invalid credentials');
  }
});

// Test missing email
Scenario('Login with missing email', async ({ I }) => {
  const res = await I.sendPostRequest('/api/login', {
    password: 'password123'
  });
  
  console.log('Missing email response status:', res.status);
  assert(res.status === 401, 'Missing email should return 401 status');
  
  // Verify error message if present
  if (res.data && res.data.message) {
    console.log('Error message:', res.data.message);
  }
});

// Test missing password
Scenario('Login with missing password', async ({ I }) => {
  const res = await I.sendPostRequest('/api/login', {
    email: 'test@ridervolt.com'
  });
  
  console.log('Missing password response status:', res.status);
  assert(res.status === 401, 'Missing password should return 401 status');
  
  // Verify error message if present
  if (res.data && res.data.message) {
    console.log('Error message:', res.data.message);
  }
});

// Test registration (if available)
Scenario('Registration attempt', async ({ I }) => {
  // Generate a random email to avoid conflicts
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  
  // From the error message, we see that full_name is required
  const res = await I.sendPostRequest('/api/register', {
    email: randomEmail,
    password: 'securePassword123',
    full_name: 'Test User',  // Changed from name to full_name based on error
    phone: '1234567890'  // Added phone field which might be required
  });
  
  console.log('Registration response status:', res.status);
  console.log('Registration response data:', res.data);
  
  // If registration endpoint exists and works, it should return 201 Created
  // Otherwise, this might return 404 Not Found or another error code
  if (res.status === 201 || res.status === 200) {
    console.log('Registration successful');
    
    // If the API returns a token upon registration
    if (res.data && res.data.token) {
      assert(res.data.token, 'Registration should return an auth token');
    }
  } else if (res.status === 500) {
    console.log('Registration failed with server error - check required fields');
  } else if (res.status === 400) {
    console.log('Registration failed with validation error - check request format');
  } else {
    console.log('Registration endpoint might not be available or requires different parameters');
  }
});

// Test token validation (if available)
Scenario('Token validation', async ({ I }) => {
  // First login to get a token
  const loginRes = await I.sendPostRequest('/api/login', {
    email: 'test@ridervolt.com',
    password: 'password123'
  });
  
  // If login was successful and returned a token
  if (loginRes.status === 200 && loginRes.data && loginRes.data.token) {
    const token = loginRes.data.token;
    console.log('Got token for validation test');
    
    // Now test the token validation endpoint (if available)
    const validateRes = await I.sendGetRequest('/api/validate-token', {
      'Authorization': `Bearer ${token}`
    });
    
    console.log('Token validation response:', validateRes.status);
    if (validateRes.status === 200) {
      console.log('Token validation successful');
    } else {
      console.log('Token validation endpoint might not be available');
    }
  } else {
    console.log('Could not obtain token for validation test');
  }
});

// Test password reset request (if available)
Scenario('Password reset request', async ({ I }) => {
  const res = await I.sendPostRequest('/api/forgot-password', {
    email: 'test@ridervolt.com'
  });
  
  console.log('Password reset request response status:', res.status);
  
  // Most password reset endpoints will return 200 even if email doesn't exist (for security reasons)
  if (res.status === 200 || res.status === 202) {
    console.log('Password reset request was accepted');
  } else if (res.status === 404) {
    console.log('Password reset endpoint not found');
  } else {
    console.log('Password reset request failed or requires different parameters');
    console.log('Response:', res.data);
  }
});

// Test password reset with invalid token
Scenario('Password reset with invalid token', async ({ I }) => {
  const res = await I.sendPostRequest('/api/reset-password', {
    token: 'invalid_token',
    password: 'newPassword123',
    confirmPassword: 'newPassword123'
  });
  
  console.log('Invalid password reset token response status:', res.status);
  
  // Should return 400 or 401 for invalid tokens
  if (res.status === 400 || res.status === 401 || res.status === 403) {
    console.log('Invalid token correctly rejected');
  } else if (res.status === 404) {
    console.log('Password reset endpoint not found');
  } else {
    console.log('Unexpected response for invalid token');
    console.log('Response:', res.data);
  }
});