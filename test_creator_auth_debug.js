// Creator Authentication Debug Script
// Run this in the browser console to debug authentication issues

console.log('🧪 CREATOR AUTHENTICATION DEBUG SCRIPT');
console.log('=====================================');

// Function to clear all authentication data
function clearAuthData() {
    const authKeys = ['access_token', 'refresh_token', 'creator_token', 'user_type', 'creator_user', 'creator_profile'];
    authKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🗑️ Cleared: ${key}`);
    });
    console.log('✅ All authentication data cleared');
}

// Function to display current authentication state
function showAuthState() {
    console.log('\n📊 CURRENT AUTHENTICATION STATE:');
    console.log('================================');

    const authKeys = ['access_token', 'refresh_token', 'creator_token', 'user_type', 'creator_user', 'creator_profile'];
    authKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            if (key.includes('token')) {
                console.log(`✅ ${key}: ${value.substring(0, 15)}...`);
            } else if (key.includes('user') || key.includes('profile')) {
                try {
                    const parsed = JSON.parse(value);
                    console.log(`✅ ${key}:`, parsed);
                } catch {
                    console.log(`✅ ${key}: ${value}`);
                }
            } else {
                console.log(`✅ ${key}: ${value}`);
            }
        } else {
            console.log(`❌ ${key}: Not set`);
        }
    });
}

// Function to test creator login API
async function testCreatorLogin(username = 'creator1', password = 'creatorpass123') {
    console.log('\n🔐 TESTING CREATOR LOGIN API:');
    console.log('=============================');

    try {
        const response = await fetch('http://localhost:8000/api/creator/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Creator Login API Success:');
            console.log('- Token:', data.token ? data.token.substring(0, 15) + '...' : 'None');
            console.log('- User:', data.user);
            console.log('- Creator Profile:', data.creator_profile);
            return data;
        } else {
            console.error('❌ Creator Login API Failed:', data);
            return null;
        }
    } catch (error) {
        console.error('❌ Creator Login API Error:', error);
        return null;
    }
}

// Function to test creator dashboard API
async function testCreatorDashboard(token) {
    console.log('\n📊 TESTING CREATOR DASHBOARD API:');
    console.log('=================================');

    if (!token) {
        token = localStorage.getItem('access_token') || localStorage.getItem('creator_token');
    }

    if (!token) {
        console.error('❌ No token available for dashboard test');
        return null;
    }

    try {
        const response = await fetch('http://localhost:8000/api/creator/dashboard/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Creator Dashboard API Success:');
            console.log('- Creator Profile:', data.creator_profile);
            console.log('- Dashboard Stats:', data.dashboard_stats);
            return data;
        } else {
            console.error('❌ Creator Dashboard API Failed:', data);
            return null;
        }
    } catch (error) {
        console.error('❌ Creator Dashboard API Error:', error);
        return null;
    }
}

// Complete authentication flow test
async function testCompleteFlow() {
    console.log('\n🚀 TESTING COMPLETE CREATOR AUTHENTICATION FLOW:');
    console.log('================================================');

    // Step 1: Clear existing data
    console.log('\n1️⃣ Clearing existing authentication data...');
    clearAuthData();

    // Step 2: Test creator login
    console.log('\n2️⃣ Testing creator login...');
    const loginData = await testCreatorLogin();
    if (!loginData) {
        console.error('❌ Creator login failed, stopping test');
        return;
    }

    // Step 3: Simulate CreatorLogin component behavior
    console.log('\n3️⃣ Simulating CreatorLogin component behavior...');
    localStorage.setItem('creator_token', loginData.token);
    localStorage.setItem('access_token', loginData.token);
    localStorage.setItem('user_type', 'creator');
    localStorage.setItem('creator_user', JSON.stringify(loginData.user));
    localStorage.setItem('creator_profile', JSON.stringify(loginData.creator_profile));
    console.log('✅ Authentication data stored in localStorage');

    // Step 4: Test creator dashboard access
    console.log('\n4️⃣ Testing creator dashboard access...');
    const dashboardData = await testCreatorDashboard(loginData.token);
    if (!dashboardData) {
        console.error('❌ Creator dashboard access failed');
        return;
    }

    // Step 5: Show final state
    console.log('\n5️⃣ Final authentication state:');
    showAuthState();

    console.log('\n✅ COMPLETE FLOW TEST PASSED!');
    console.log('You should now be able to:');
    console.log('- Navigate to /creator/dashboard');
    console.log('- See the orange creator dashboard UI');
    console.log('- Access creator-specific features');

    return true;
}

// Diagnostic function to check why creator dashboard might redirect
function diagnoseDashboardRedirect() {
    console.log('\n🔍 DIAGNOSING CREATOR DASHBOARD REDIRECT ISSUE:');
    console.log('==============================================');

    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('access_token') || localStorage.getItem('creator_token');
    const user = localStorage.getItem('creator_user');

    console.log('Checking redirect conditions...');

    if (userType !== 'creator') {
        console.error('❌ ISSUE FOUND: user_type is not "creator"');
        console.log(`   Current value: "${userType}"`);
        console.log('   Expected: "creator"');
        console.log('   FIX: Ensure CreatorLogin sets localStorage.setItem("user_type", "creator")');
        return false;
    }

    if (!token) {
        console.error('❌ ISSUE FOUND: No authentication token found');
        console.log('   Expected: access_token or creator_token in localStorage');
        console.log('   FIX: Ensure login process stores token correctly');
        return false;
    }

    if (!user) {
        console.warn('⚠️ WARNING: No creator_user data found');
        console.log('   This might cause issues with user context');
        console.log('   FIX: Ensure login stores user data in localStorage');
    }

    console.log('✅ All redirect conditions passed');
    console.log('If dashboard still redirects, check:');
    console.log('1. Browser console for error messages');
    console.log('2. Network tab for failed API calls');
    console.log('3. React component useEffect dependencies');

    return true;
}

// Export functions for console use
window.authDebug = {
    clearAuthData,
    showAuthState,
    testCreatorLogin,
    testCreatorDashboard,
    testCompleteFlow,
    diagnoseDashboardRedirect
};

console.log('\n🛠️ DEBUG FUNCTIONS AVAILABLE:');
console.log('============================');
console.log('authDebug.clearAuthData()         - Clear all auth data');
console.log('authDebug.showAuthState()         - Show current auth state');
console.log('authDebug.testCreatorLogin()      - Test creator login API');
console.log('authDebug.testCreatorDashboard()  - Test creator dashboard API');
console.log('authDebug.testCompleteFlow()      - Test complete auth flow');
console.log('authDebug.diagnoseDashboardRedirect() - Diagnose redirect issues');
console.log('\n🚀 Quick start: Run authDebug.testCompleteFlow()'); 