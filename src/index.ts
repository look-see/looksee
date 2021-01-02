#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");

const greeting = chalk.green.bold("Thanks for using 👀 looksee!");

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);