#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require('chalk');
const boxen = require('boxen');

const messages = require('./messages');
const watcher = require('./watcher');

const options = yargs
    .usage("Usage: looksee -s [url]")
    .option("s", { alias: "server", describe: "Url to the page on the server you wish to test.\nDefaults to http://localhost:8080.", type: "string", demandOption: false })
    .option("w", { alias: "watch", describe: "Whether to watch for changes in test files.", type: "boolean", demandOption: false })
    .option("a", { alias: "automation", describe: "Set this flag when running automation scripts in ci/cd pipeline.", type: "boolean", demandOption: false })
    .argv;

messages.hello(chalk, boxen);

if (options.automation) {
    // Cannot use callback in exec because dev server will not stop unless forced and we need it
    const snowpack = require('child_process').exec('npx snowpack dev --config tests/snowpack.config.js');
        const timeoutObj = setTimeout(() => {
            // Give server time to start. Snowpack dev is pretty fast.
            watcher.watch(options, chalk);
          }, 1000);
} else {
    watcher.watch(options, chalk);
}

process.on('unhandledRejection', function () {
    process.exit(1);
});

process.on('SIGINT', function () {
    process.exit(0);
});

process.on('exit', function () {
    messages.thanks(chalk, boxen);
});