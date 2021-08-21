const fs = require('fs');
exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    try {
        // expect(1).toBe(1)
        const expect = (recievedValue) => ({
            toBe: (expectedValue) => {
                if (expectedValue !== recievedValue)
                    throw new Error(`Expected ${expectedValue} but received ${recievedValue}`)
            }
        })
        eval(code);
        testResult.success = true;
    } catch (error) {
        testResult.errorMessage = error.message
    }
    return testResult
}