/**
 * Authentication Flow Test
 * 
 * This script tests the login and signup functionality
 * Run with: node test-auth-flow.mjs
 */

const BASE_URL = 'http://localhost:3000';

// Test data
const testUser = {
  email: `test${Date.now()}@example.com`,
  password: 'TestPassword123!',
  full_name: 'Test User',
  role: 'author'
};

console.log('🚀 Starting Authentication Tests...\n');

// Test 1: Signup
async function testSignup() {
  console.log('📝 Test 1: User Signup');
  console.log('Testing with:', { email: testUser.email, full_name: testUser.full_name, role: testUser.role });
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ PASS: User created successfully');
      console.log('   User ID:', data.user?.id);
      console.log('   Email:', data.user?.email);
      console.log('   Role:', data.user?.role);
      return { success: true, userId: data.user?.id };
    } else {
      console.log('❌ FAIL:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Test 2: Login with valid credentials
async function testValidLogin() {
  console.log('\n🔐 Test 2: Login with Valid Credentials');
  console.log('Testing with:', { email: testUser.email });
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ PASS: Login successful');
      console.log('   User:', data.user?.full_name);
      console.log('   Role:', data.user?.role);
      
      // Check if cookie is set
      const cookies = response.headers.get('set-cookie');
      if (cookies && cookies.includes('auth-token')) {
        console.log('✅ PASS: Auth cookie is set');
      } else {
        console.log('⚠️  WARNING: Auth cookie not found');
      }
      
      return { success: true };
    } else {
      console.log('❌ FAIL:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Test 3: Login with invalid credentials
async function testInvalidLogin() {
  console.log('\n🔒 Test 3: Login with Invalid Credentials');
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: 'WrongPassword123!',
      }),
    });

    const data = await response.json();
    
    if (!response.ok && data.error) {
      console.log('✅ PASS: Invalid login rejected correctly');
      console.log('   Error message:', data.error);
      return { success: true };
    } else {
      console.log('❌ FAIL: Invalid login was accepted');
      return { success: false };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Test 4: Signup with duplicate email
async function testDuplicateSignup() {
  console.log('\n👥 Test 4: Signup with Duplicate Email');
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (!response.ok && data.error?.includes('already exists')) {
      console.log('✅ PASS: Duplicate email rejected correctly');
      console.log('   Error message:', data.error);
      return { success: true };
    } else {
      console.log('❌ FAIL: Duplicate email was accepted');
      return { success: false };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Test 5: Signup with invalid email
async function testInvalidEmail() {
  console.log('\n📧 Test 5: Signup with Invalid Email');
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'TestPassword123!',
        full_name: 'Test User',
        role: 'author'
      }),
    });

    const data = await response.json();
    
    if (!response.ok && data.error) {
      console.log('✅ PASS: Invalid email rejected correctly');
      console.log('   Error message:', data.error);
      return { success: true };
    } else {
      console.log('❌ FAIL: Invalid email was accepted');
      return { success: false };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Test 6: Signup with weak password
async function testWeakPassword() {
  console.log('\n🔑 Test 6: Signup with Weak Password');
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `test${Date.now()}@example.com`,
        password: '123',
        full_name: 'Test User',
        role: 'author'
      }),
    });

    const data = await response.json();
    
    if (!response.ok && data.error) {
      console.log('✅ PASS: Weak password rejected correctly');
      console.log('   Error message:', data.error);
      return { success: true };
    } else {
      console.log('❌ FAIL: Weak password was accepted');
      return { success: false };
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('           AUTHENTICATION FLOW TEST SUITE');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const results = [];
  
  // Test signup
  const signupResult = await testSignup();
  results.push({ name: 'Signup', ...signupResult });
  
  if (signupResult.success) {
    // Test valid login
    const loginResult = await testValidLogin();
    results.push({ name: 'Valid Login', ...loginResult });
    
    // Test invalid login
    const invalidLoginResult = await testInvalidLogin();
    results.push({ name: 'Invalid Login', ...invalidLoginResult });
    
    // Test duplicate signup
    const duplicateResult = await testDuplicateSignup();
    results.push({ name: 'Duplicate Email', ...duplicateResult });
  } else {
    console.log('\n⚠️  Skipping remaining tests due to signup failure');
  }
  
  // Test invalid email (independent)
  const emailResult = await testInvalidEmail();
  results.push({ name: 'Invalid Email', ...emailResult });
  
  // Test weak password (independent)
  const passwordResult = await testWeakPassword();
  results.push({ name: 'Weak Password', ...passwordResult });
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('                      TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
  });
  
  console.log(`\n📊 Total: ${results.length} tests`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed successfully!');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
  }
  
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

// Run tests
runAllTests().catch(console.error);
