// Configuration globale pour les tests
import { beforeAll, afterAll } from 'bun:test';

beforeAll(() => {
  console.log('🧪 Initializing tests');
});

afterAll(() => {
  console.log('✅ Tests completed');
});
