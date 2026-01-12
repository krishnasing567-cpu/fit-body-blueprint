#!/usr/bin/env node

/**
 * OAuth Setup Diagnostic Script
 * Run this script to check if OAuth is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 OAuth Setup Diagnostic\n');
console.log('=' .repeat(50));

// Check .env file
console.log('\n✓ Checking environment variables...');
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasUrl = envContent.includes('VITE_SUPABASE_URL');
  const hasKey = envContent.includes('VITE_SUPABASE_PUBLISHABLE_KEY');
  
  console.log(`  ${hasUrl ? '✅' : '❌'} VITE_SUPABASE_URL is set`);
  console.log(`  ${hasKey ? '✅' : '❌'} VITE_SUPABASE_PUBLISHABLE_KEY is set`);
  
  if (!hasUrl || !hasKey) {
    console.log('\n  ⚠️  Missing Supabase credentials');
    console.log('     Copy from .env.example and update with your values');
  }
} else {
  console.log('  ❌ .env file not found');
  console.log('  📝 Copy .env.example to .env and add your credentials');
}

// Check auth files
console.log('\n✓ Checking auth files...');
const authFiles = [
  'src/contexts/AuthContext.tsx',
  'src/pages/Login.tsx',
  'src/pages/SignUp.tsx',
  'src/pages/AuthCallback.tsx',
  'src/integrations/supabase/client.ts'
];

authFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Check routes
console.log('\n✓ Checking routes...');
const appPath = path.join(__dirname, 'src/App.tsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf-8');
  const hasAuthCallback = appContent.includes('/auth/callback');
  const hasLogin = appContent.includes('/auth/login');
  const hasSignup = appContent.includes('/auth/signup');
  
  console.log(`  ${hasLogin ? '✅' : '❌'} /auth/login route`);
  console.log(`  ${hasSignup ? '✅' : '❌'} /auth/signup route`);
  console.log(`  ${hasAuthCallback ? '✅' : '❌'} /auth/callback route`);
}

console.log('\n' + '='.repeat(50));
console.log('\n📋 Next Steps:\n');
console.log('1. Add your Supabase credentials to .env');
console.log('2. Go to your Supabase project: https://app.supabase.com');
console.log('3. Enable Google OAuth in Authentication → Providers');
console.log('4. Enable GitHub OAuth in Authentication → Providers');
console.log('5. Add your OAuth credentials to Supabase');
console.log('6. Test by visiting: http://localhost:5173/auth/login\n');

console.log('📚 Documentation:');
console.log('   - OAUTH_TROUBLESHOOTING.md (quick setup guide)');
console.log('   - SOCIAL_AUTH_SETUP.md (detailed instructions)');
console.log('   - AUTH_SETUP_QUICK_START.md (5-minute setup)\n');
