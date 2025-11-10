#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

// 获取nx路径
const nxPath = path.join(__dirname, 'node_modules', '.bin', 'nx');

try {
  console.log('Starting build with Nx...');
  execSync(`"${nxPath}" run web:build`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
