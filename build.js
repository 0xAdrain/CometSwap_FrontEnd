#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Starting Nx build for web app...');
  
  // Use nx/bin/nx.js which works on all platforms
  const nxBin = path.join(__dirname, 'node_modules', 'nx', 'bin', 'nx.js');
  
  execSync(`node "${nxBin}" run web:build`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
