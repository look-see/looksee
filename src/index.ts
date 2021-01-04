#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require('chalk');
const boxen = require('boxen');

const messages = require('./messages');
const puppeteer = require('./watcher');

const options = yargs
 .usage("Usage: looksee [-w|--watch]")
 .option("w", { alias: "watch", describe: "Whether to watch for changes in test files.", type: "boolean", demandOption: false })
 .argv;

messages.hello(chalk, boxen);
puppeteer.launch(options, chalk);

process.on('unhandledRejection', function() {
    messages.thanks(chalk, boxen);
    process.exit(1);
});

process.on('SIGINT', function() {
    messages.thanks(chalk, boxen);
});
