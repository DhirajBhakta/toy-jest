const fs = require('fs');
const expect = require('expect');
exports.runTest = async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    let testName = '';
    try {
        const describeFns = [];
        let currentDescribeFn;
        const describe = (name, func) => describeFns.push([name, func]);
        const it = (name, func) =>  currentDescribeFn.push([name,func])
        eval(code);
        for(const [name, fn] of describeFns){
            currentDescribeFn = [];
            testName = name;
            fn();
            for(const [itName, itFn] of currentDescribeFn){
                testName += ' ' + itName;
                itFn();
            }
        }
        testResult.success = true;
    } catch (error) {
        testResult.errorMessage = testName+ ' : ' +error.message
    }
    return testResult
}