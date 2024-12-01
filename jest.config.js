module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom', // Optional if testing browser-like environments is not required
    moduleFileExtensions: ['js', 'jsx', 'mjs'],
};
