#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  console.log('🚀 Starting Nx build for web app...');
  execSync('npx nx run web:build', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
