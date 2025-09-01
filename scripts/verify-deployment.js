const https = require('https');
const http = require('http');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-render-service.onrender.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-netlify-app.netlify.app';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test backend endpoint
function testBackend() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/health`;
    log(`Testing backend: ${url}`, 'blue');
    
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.status === 'OK') {
              log('✅ Backend is healthy!', 'green');
              resolve(true);
            } else {
              log('❌ Backend health check failed', 'red');
              resolve(false);
            }
          } catch (e) {
            log('❌ Backend returned invalid JSON', 'red');
            resolve(false);
          }
        } else {
          log(`❌ Backend returned status ${res.statusCode}`, 'red');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      log(`❌ Backend connection failed: ${err.message}`, 'red');
      resolve(false);
    });
  });
}

// Test frontend
function testFrontend() {
  return new Promise((resolve) => {
    log(`Testing frontend: ${FRONTEND_URL}`, 'blue');
    
    const client = FRONTEND_URL.startsWith('https') ? https : http;
    
    client.get(FRONTEND_URL, (res) => {
      if (res.statusCode === 200) {
        log('✅ Frontend is accessible!', 'green');
        resolve(true);
      } else {
        log(`❌ Frontend returned status ${res.statusCode}`, 'red');
        resolve(false);
      }
    }).on('error', (err) => {
      log(`❌ Frontend connection failed: ${err.message}`, 'red');
      resolve(false);
    });
  });
}

// Test services endpoint
function testServices() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/services`;
    log(`Testing services endpoint: ${url}`, 'blue');
    
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.success && response.data && response.data.length > 0) {
              log(`✅ Services endpoint working! Found ${response.data.length} services`, 'green');
              
              // Check if pricing is in KSH
              const firstService = response.data[0];
              if (firstService.pricing && firstService.pricing.currency === 'KSH') {
                log('✅ Services have KSH pricing!', 'green');
              } else {
                log('⚠️  Services pricing currency might not be KSH', 'yellow');
              }
              
              resolve(true);
            } else {
              log('❌ Services endpoint returned no data', 'red');
              resolve(false);
            }
          } catch (e) {
            log('❌ Services endpoint returned invalid JSON', 'red');
            resolve(false);
          }
        } else {
          log(`❌ Services endpoint returned status ${res.statusCode}`, 'red');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      log(`❌ Services endpoint connection failed: ${err.message}`, 'red');
      resolve(false);
    });
  });
}

// Main verification function
async function verifyDeployment() {
  log('🚀 Starting deployment verification...', 'blue');
  log('=' .repeat(50), 'blue');
  
  const results = {
    backend: await testBackend(),
    frontend: await testFrontend(),
    services: await testServices()
  };
  
  log('=' .repeat(50), 'blue');
  log('📊 Verification Results:', 'blue');
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${test.toUpperCase()}: ${status}`, color);
  });
  
  const allPassed = Object.values(results).every(result => result);
  
  log('=' .repeat(50), 'blue');
  
  if (allPassed) {
    log('🎉 All tests passed! Your deployment is working correctly.', 'green');
    log('🌐 Frontend: ' + FRONTEND_URL, 'green');
    log('🔧 Backend: ' + BACKEND_URL, 'green');
  } else {
    log('⚠️  Some tests failed. Please check the issues above.', 'yellow');
    log('📖 Refer to RENDER_NETLIFY_DEPLOYMENT.md for troubleshooting.', 'yellow');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run verification
verifyDeployment().catch(err => {
  log(`❌ Verification failed: ${err.message}`, 'red');
  process.exit(1);
});
