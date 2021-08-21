const fs = require('fs');
const expect = require('expect');
const {describe, it, run, resetState} = require('jest-circus');

exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    let testName = '';
    try {
        resetState();
        eval(code);
        const {testResults} = await run();
        testResult.testResults = testResults;
        testResult.success = testResults.every((results) => !results.errors.length)
    } catch (error) {
        testResult.errorMessage = testName+ ' : ' +error.message
    }
    return testResult
}