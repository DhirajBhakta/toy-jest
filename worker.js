const fs = require('fs');
const expect = require('expect');
const {dirname, join} = require("path");
const {describe, it, run, resetState } = require('jest-circus');
const vm = require('vm');
const NodeEnvironment = require("jest-environment-node")
const secret = "my_secret"
exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    let testName = '';
    try {
        const customRequire = (fileName) =>{
            const code = fs.readFileSync(join(dirname(testFile), fileName), 'utf-8');
            vm.runInContext(`const module={exports:{}};  \n ${code};\n  module.exports`, environment.getVmContext())
        }
        const environment = new NodeEnvironment({
            testEnvironmentOptions:{describe, it , expect, require:customRequire, console}
        })
        resetState();
        vm.runInContext(code, environment.getVmContext())
        const {testResults} = await run();
        testResult.testResults = testResults;
        testResult.success = testResults.every((results) => !results.errors.length)
    } catch (error) {
        testResult.errorMessage = testName+ ' : ' +error.message
    }
    return testResult
}