Feature('Authentication API Tests');

// Import assert for validation
const assert = require('assert');


// Test retrieving all stations
Scenario('Get all stations - should return 200 and valid station objects', async ({ I }) => {
  const res = await I.sendGetRequest('/api/stations');

  console.log('Get stations response status:', res.status);
  console.log('Get stations response data (first 2 items):', Array.isArray(res.data) ? res.data.slice(0,2) : res.data);

  // Expect HTTP 200
  assert.strictEqual(res.status, 200, 'GET /api/stations should return 200');

  // Expect response body to be an array
  assert(Array.isArray(res.data), 'Response data should be an array');

  // If there are items, verify the schema for the first item
  if (res.data.length > 0) {
    const station = res.data[0];

    // Required fields and their basic types
    assert.strictEqual(typeof station.id, 'number', 'station.id should be a number');
    assert.strictEqual(typeof station.name, 'string', 'station.name should be a string');
    assert.strictEqual(typeof station.address, 'string', 'station.address should be a string');
    assert.strictEqual(typeof station.staffId, 'number', 'station.staffId should be a number');
    assert.strictEqual(typeof station.staffFullName, 'string', 'station.staffFullName should be a string');
    assert.strictEqual(typeof station.totalVehicles, 'number', 'station.totalVehicles should be a number');

    console.log('Station schema validated for first item');
  } else {
    console.log('Response returned an empty array - still a valid 200 response');
  }
});


// Successful registration
Scenario('Register new user with valid data returns 200 and userId', async ({ I }) => {
  const unique = Date.now();
  const email = `test.user.${unique}@example.com`;

  const payload = {
    fullName: 'Test User',
    email: email,
    password: 'P@ssw0rd123!',
    phone: '+84491234567',
    // Use a placeholder recaptchaToken; adjust if your environment validates this externally
    recaptchaToken: 'test-recaptcha-token'
  };

  const res = await I.sendPostRequest('/api/register', payload);

  console.log('Register response status:', res.status);
  console.log('Register response data:', res.data);

  // Expect HTTP 200 for successful registration
  assert.strictEqual(res.status, 200, 'POST /api/register should return 200 for valid data');

  // Response should include message and userId
  assert(res.data && typeof res.data.message === 'string', 'Response should contain a message string');
  assert(res.data && typeof res.data.userId === 'number', 'Response should contain a numeric userId');
});

// Invalid registration data
Scenario('Register with invalid data returns 400', async ({ I }) => {
  const payload = {
    fullName: '',
    email: 'invalid-email',
    password: '123',
    // missing phone and recaptchaToken
  };

  const res = await I.sendPostRequest('/api/register', payload);

  console.log('Invalid register response status:', res.status);
  console.log('Invalid register response data:', res.data);

  // Expect 400 Bad Request for invalid registration data
  assert.strictEqual(res.status, 400, 'Invalid registration should return 400');

  // Optionally check error message
  if (res.data && res.data.message) {
    console.log('Error message:', res.data.message);
  }
});



