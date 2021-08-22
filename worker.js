const fs = require('fs');
const expect = require('expect');
const {describe, it, run, resetState} = require('jest-circus');
const vm = require('vm');
const secret = "my_secret"
exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    let testName = '';
    try {
        const context = { describe, it , expect, setTimeout};
        vm.createContext(context)
        resetState();
        vm.runInContext(code, context)
        const {testResults} = await run();
        testResult.testResults = testResults;
        testResult.success = testResults.every((results) => !results.errors.length)
    } catch (error) {
        testResult.errorMessage = testName+ ' : ' +error.message
    }
    return testResult
}