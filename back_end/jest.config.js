module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    globals: {
        'ts-jest': {
            diagnostics: true,
            tsconfig: 'tsconfig.json'
        }
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1'
    }
};
