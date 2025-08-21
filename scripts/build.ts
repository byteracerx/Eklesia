#!/usr/bin/env bun

import { build } from 'bun';
import { readdir, mkdir, rm } from 'fs/promises';
import { join } from 'path';

// Nettoyer le dossier dist
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

// Build CommonJS
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'cjs',
  sourcemap: 'external',
  minify: false,
  splitting: false,
  naming: 'index.js'
});

// Build ES Modules
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'esm',
  sourcemap: 'external',
  minify: false,
  splitting: false,
  naming: 'index.mjs'
});

// Générer les déclarations TypeScript
const tsc = Bun.spawn(['bun', 'tsc', '--emitDeclarationOnly'], {
  stdout: 'inherit',
  stderr: 'inherit'
});

await tsc.exited;
console.log('✅ Build completed successfully!');
