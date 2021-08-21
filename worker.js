const fs = require('fs');

exports.runTest = async (testFile) =>{
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }
    try{
        eval(code);
        testResult.success = true;
    }catch(error){
        testResult.errorMessage = error.message
    }
    return testResult
}