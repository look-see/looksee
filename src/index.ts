#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const yargs = require("yargs");

const options = yargs
 .usage("Usage: -s <path> -o")
 .option("s", { alias: "snowpack", describe: "Path to dev test snowpack.config.js file.", type: "string", demandOption: false })
 .option("o", { alias: "open", describe: "Whether to open browser tab in local development.", type: "boolean", demandOption: false })
 .argv;

const greeting = chalk.bold.yellow('LET\'S HAVE A 👀 LOOKSEE!');

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
  backgroundColor: '#555555'
};
const greetBox = boxen(greeting, boxenOptions);

console.log(greetBox);

const snowpackConfig = options.snowpack
    ? options.snowpack
    : './src/snowpack.config.js';

const snowpack = exec(`npx snowpack dev --config ${snowpackConfig} ${options.open ? '--devOptions.open default' : ''}`);

snowpack.stdout.on("data", data => {
    console.log(`snowpack stdout: ${data}`);
});

snowpack.stderr.on("data", data => {
    console.log(`snowpack stderr: ${data}`);
});

snowpack.on('error', (error) => {
    console.exception(`snowpack error: ${error.message}`);
});

snowpack.on("close", code => {
    console.exception(`snowpack exited with code ${code}`);
});

let throwError = false;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => {
        switch (msg.type()) {
            case 'error':
            case 'assert':
                console.error('\t' + chalk.red('👀  ' + msg.text()));
                throwError = true;
                break;
            // case 'log':
            //     console.log(chalk.blue(msg.text()));
            //     break;
            case 'info':
                console.log('    ' + chalk.green(msg.text()));
                break;
        }
    });
    await page.goto('http://localhost:8080/');
    // await browser.close();

    // if (throwError)
    //     throw 'Exit';
    // else
    //     process.exit();
})();

process.on('unhandledRejection', function() {
    process.exit(1);
});

process.on('SIGINT', function() {
    const salutation = chalk.bold.yellow('THANKS FOR USING 👀 LOOKSEE!');
    const goodByeBox = boxen(salutation, boxenOptions);

    console.log(goodByeBox);
});



// (async () => {
//   const server = await snowpack.startDevServer({
//     config:{
//       mount: {
//         tests: {url: '/', static: true}
//       },
//       devOptions: {
//         hostname: 'localhost',
//         port: 8080,
//         fallback: 'index.html',

//       },
//       buildOptions: {
//         out: 'bin',
//         webModulesUrl: 'web_modules',
//         metaDir : '__snowpack__'
//       },
//       experiments: {
//         source: 'local',
//         routes: [],
//       },
//       plugins: [],
//       exclude: [],
//       testOptions: {
//         files: []
//       },
//       proxy: []
//     },
//     cwd: '',
//     lockfile: {}
//   });
// })();
