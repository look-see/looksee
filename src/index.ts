#!/usr/bin/env node

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: looksee -u <url>')
    .option("u", { alias: "url", describe: "A space-separated list of urls to the html pages that have testing scripts embedded.", type: "string", demandOption: true })
    .option("w", { alias: "watch", describe: "Whether to watch for changes.", type: "boolean", demandOption: false })
    .option("a", { alias: "automation", describe: "Set this flag when running automation scripts in ci/cd pipeline, such as GitHub Actions.", type: "boolean", demandOption: false })
    .array('u')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright (c) 2021 Allan Mobley Jr. All rights reserved.')
    .argv;
    
const messages = require('./messages');
const watcher = require('./watcher');

messages.hello();

if (argv.automation) {
    // Cannot use callback in exec because dev server will not stop unless forced and we need it
    const snowpack = require('child_process').exec('npx snowpack dev --config snowpack.ci.config.js');
        const timeoutObj = setTimeout(() => {
            // Give server time to start. Snowpack dev is pretty fast.
            watcher.watch(argv);
          }, 1000);
} else {
    watcher.watch(argv);
}

process.on('unhandledRejection', function () {
    process.exit(1);
});

process.on('SIGINT', function () {
    process.exit(0);
});

process.on('exit', function () {
    messages.thanks();
});