const chalk = require('chalk');
const boxen = require('boxen');

function hello() {
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
}

module.exports.hello = hello;

function thanks() {
  const salutation = chalk.bold.yellow('THANKS FOR USING 👀 LOOKSEE!');
  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: '#555555'
  };
  const goodByeBox = boxen(salutation, boxenOptions);
  console.log(goodByeBox);
}

module.exports.thanks = thanks;