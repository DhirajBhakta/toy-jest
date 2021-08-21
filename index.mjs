import glob from 'glob';
import Haste from 'jest-haste-map';

// to get #cpus to know the number of workers
import { cpus } from 'os';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';


// this is much slower, hence we dont use it and we use haste-map
const allFiles = glob.sync("**/*.test.js");

// dirname of our index.mjs
const root = dirname(fileURLToPath(import.meta.url))

// this is much faster than glob
// haste does much better caching of _which files have changed_ and stuff
const hasteMap = new Haste.default({
    rootDir: root,
    roots: [root],
    maxWorkers: cpus().length,
    platforms: [],
    extensions: ['js'],
    name: 'best-cache',
    // watch:true
})

// hasteFS is in-memory file system
// but what if the file changes on the real file system?
// haste has a watch mode to update the internal representation in-memory whenever the real file changes
const { hasteFS } = await hasteMap.build();
const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

// to read the test files
import { runTest } from './worker.js'

// read the test files | singe threaded
for await (const testFile of testFiles) {
    console.log(await runTest(testFile))
}

import { Worker } from 'jest-worker';
import chalk from 'chalk';

const worker = new Worker(join(root, 'worker.js'), {
    enableWorkerThreads: true
})
// read the test files | multi threaded
for await (const testFile of testFiles) {
    const { success, errorMessage } = await worker.runTest(testFile);

    const status = success
        ? chalk.green.inverse(' PASS')
        : chalk.red.inverse(' FAIL')
    console.log(status+' : '+ chalk.dim(relative(root,testFile)))
    if(!success)
        console.log('\t'+errorMessage)

}

worker.end();


