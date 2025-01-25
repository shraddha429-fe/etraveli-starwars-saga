module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testRegex: '.*\\.spec\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transformIgnorePatterns: [
      "/node_modules/(?!react-spinners)/",
    ],
  };
  