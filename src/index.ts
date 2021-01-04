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
 .argv;

messages.hello(chalk, boxen);
watcher.watch(options, chalk);

// process.on('unhandledRejection', function() {
//     process.exit(1);
// });

process.on('SIGINT', function() {
    process.exit(0);
});

process.on('exit', function() {
    messages.thanks(chalk, boxen);
});