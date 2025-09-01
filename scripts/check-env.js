const fs = require('fs');
const path = require('path');

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

// Required environment variables for backend
const BACKEND_ENV_VARS = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'EMAIL_USER',
  'EMAIL_PASS',
  'NOTIFICATION_EMAIL',
  'FRONTEND_URL',
  'WHATSAPP_PHONE',
  'JWT_SECRET'
];

// Required environment variables for frontend
const FRONTEND_ENV_VARS = [
  'REACT_APP_API_URL',
  'REACT_APP_WHATSAPP_PHONE'
];

function checkBackendEnv() {
  log('🔧 Checking Backend Environment Variables...', 'blue');
  
  const envPath = path.join(__dirname, '../backend/.env.production');
  
  if (!fs.existsSync(envPath)) {
    log('❌ backend/.env.production file not found!', 'red');
    log('📝 Create this file with your production environment variables.', 'yellow');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const envVars = {};
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  let allPresent = true;
  
  BACKEND_ENV_VARS.forEach(varName => {
    if (envVars[varName] && envVars[varName] !== 'your-value-here') {
      log(`✅ ${varName}`, 'green');
    } else {
      log(`❌ ${varName} - Missing or placeholder value`, 'red');
      allPresent = false;
    }
  });
  
  // Check for placeholder values
  const placeholders = [
    'your-mongodb-atlas-connection-string',
    'your-gmail-address@gmail.com',
    'your-gmail-app-password',
    'https://your-netlify-app.netlify.app',
    'your-super-secret-jwt-key-here-make-it-long-and-random'
  ];
  
  placeholders.forEach(placeholder => {
    if (envContent.includes(placeholder)) {
      log(`⚠️  Found placeholder value: ${placeholder}`, 'yellow');
      log('   Please replace with actual values before deployment.', 'yellow');
      allPresent = false;
    }
  });
  
  return allPresent;
}

function checkFrontendEnv() {
  log('\n🌐 Checking Frontend Environment Variables...', 'blue');
  
  const envPath = path.join(__dirname, '../frontend/.env.production');
  
  if (!fs.existsSync(envPath)) {
    log('❌ frontend/.env.production file not found!', 'red');
    log('📝 Create this file with your production environment variables.', 'yellow');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const envVars = {};
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  let allPresent = true;
  
  FRONTEND_ENV_VARS.forEach(varName => {
    if (envVars[varName] && envVars[varName] !== 'your-value-here') {
      log(`✅ ${varName}`, 'green');
    } else {
      log(`❌ ${varName} - Missing or placeholder value`, 'red');
      allPresent = false;
    }
  });
  
  // Check for placeholder values
  if (envContent.includes('your-render-backend-url.onrender.com')) {
    log('⚠️  Found placeholder: your-render-backend-url.onrender.com', 'yellow');
    log('   Please replace with your actual Render service URL.', 'yellow');
    allPresent = false;
  }
  
  return allPresent;
}

function checkDeploymentFiles() {
  log('\n📁 Checking Deployment Configuration Files...', 'blue');
  
  const files = [
    { path: '../backend/render.yaml', name: 'Render configuration' },
    { path: '../frontend/netlify.toml', name: 'Netlify configuration' },
    { path: '../RENDER_NETLIFY_DEPLOYMENT.md', name: 'Deployment guide' },
    { path: '../DEPLOYMENT_CHECKLIST.md', name: 'Deployment checklist' }
  ];
  
  let allPresent = true;
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file.path);
    if (fs.existsSync(filePath)) {
      log(`✅ ${file.name}`, 'green');
    } else {
      log(`❌ ${file.name} - File missing: ${file.path}`, 'red');
      allPresent = false;
    }
  });
  
  return allPresent;
}

function checkPackageFiles() {
  log('\n📦 Checking Package Files...', 'blue');
  
  const files = [
    { path: '../backend/package.json', name: 'Backend package.json' },
    { path: '../frontend/package.json', name: 'Frontend package.json' },
    { path: '../package.json', name: 'Root package.json' }
  ];
  
  let allPresent = true;
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file.path);
    if (fs.existsSync(filePath)) {
      log(`✅ ${file.name}`, 'green');
      
      // Check for start script in backend
      if (file.path.includes('backend/package.json')) {
        const packageContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (packageContent.scripts && packageContent.scripts.start) {
          log(`  ✅ Start script found`, 'green');
        } else {
          log(`  ❌ Start script missing in backend package.json`, 'red');
          allPresent = false;
        }
      }
      
      // Check for build script in frontend
      if (file.path.includes('frontend/package.json')) {
        const packageContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (packageContent.scripts && packageContent.scripts.build) {
          log(`  ✅ Build script found`, 'green');
        } else {
          log(`  ❌ Build script missing in frontend package.json`, 'red');
          allPresent = false;
        }
      }
    } else {
      log(`❌ ${file.name} - File missing`, 'red');
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Main check function
function checkEnvironment() {
  log('🔍 Environment Check for Toshi Web App Deployment', 'blue');
  log('=' .repeat(60), 'blue');
  
  const results = {
    backendEnv: checkBackendEnv(),
    frontendEnv: checkFrontendEnv(),
    deploymentFiles: checkDeploymentFiles(),
    packageFiles: checkPackageFiles()
  };
  
  log('\n📊 Environment Check Results:', 'blue');
  log('=' .repeat(60), 'blue');
  
  Object.entries(results).forEach(([check, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${check.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${status}`, color);
  });
  
  const allPassed = Object.values(results).every(result => result);
  
  log('=' .repeat(60), 'blue');
  
  if (allPassed) {
    log('🎉 Environment check passed! Ready for deployment.', 'green');
    log('📖 Next: Follow RENDER_NETLIFY_DEPLOYMENT.md guide', 'blue');
  } else {
    log('⚠️  Environment check failed. Please fix the issues above.', 'yellow');
    log('📖 Refer to RENDER_NETLIFY_DEPLOYMENT.md for setup instructions.', 'yellow');
  }
  
  return allPassed;
}

// Run the check
if (require.main === module) {
  const passed = checkEnvironment();
  process.exit(passed ? 0 : 1);
}

module.exports = { checkEnvironment };
