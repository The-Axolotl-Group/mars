export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'], // Look for .test.ts files inside __tests__ folders
    moduleFileExtensions: ['ts', 'js', 'json'],
  };