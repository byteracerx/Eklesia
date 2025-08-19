#!/usr/bin/env bun

import { watch } from 'fs';
import { spawn } from 'bun';

console.log('🚀 Development mode activated...');
console.log('👀 Watching src/ files...');

// Build initial
await import('./build.ts');

// Watcher pour rebuild automatique
const watcher = watch('./src', { recursive: true }, async (eventType, filename) => {
  if (filename?.endsWith('.ts')) {
    console.log(`📝 Change detected: ${filename}`);
    console.log('🔄 Rebuilding...');    
    
    try {
      await import('./build.ts');
      console.log('✅ Rebuild completed');
    } catch (error) {
      console.error('❌ Build error:', error);
    }
  }
});

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n👋 Stopping development mode');
  watcher.close();
  process.exit(0);
});
