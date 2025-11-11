#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Starting Nx build for web app...');
  
  // Directly use local nx binary
  const isWindows = process.platform === 'win32';
  const nxBin = isWindows 
    ? path.join(__dirname, 'node_modules', 'nx', 'bin', 'nx.js')
    : path.join(__dirname, 'node_modules', '.bin', 'nx');
  
  execSync(`node "${nxBin}" run web:build`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
