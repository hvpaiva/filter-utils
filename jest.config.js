module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*-test.{js,ts,tsx}',
  ],
  coverageReporters: ['json', 'lcov'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js']
};
