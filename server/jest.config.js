module.exports = {
    roots: ['.'],

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    moduleFileExtensions: ['js', 'ts'],

    // The test environment that will be used for testing
    //testEnvironment: "jsdom",

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    testPathIgnorePatterns: ['/node_modules/'],
};
