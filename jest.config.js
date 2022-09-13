// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    moduleFileExtensions: ["js", "json", "ts"],
    moduleDirectories: ["node_modules", "src"],
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    testTimeout: 20000,
};

module.exports = config;
