#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require('chalk');
const boxen = require('boxen');

const snowpack = require('./snowpack');
const messages = require('./messages');
const puppeteer = require('./puppeteer');

const options = yargs
 .usage("Usage: -s [path] -o")
 .option("s", { alias: "snowpack", describe: "Path to dev test snowpack.config.js file.", type: "string", demandOption: false })
 .option("o", { alias: "open", describe: "Whether to open browser tab in local development.", type: "boolean", demandOption: false })
 .option("a", { alias: "automation", describe: "Set this flag when running automation scripts in ci/cd pipeline.", type: "boolean", demandOption: false })
 .argv;

messages.hello(chalk, boxen);
snowpack.start(options);
puppeteer.launch(options, chalk);

process.on('unhandledRejection', function() {
    messages.thanks(chalk, boxen);
    process.exit(1);
});

process.on('SIGINT', function() {
    messages.thanks(chalk, boxen);
});
