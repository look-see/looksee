function launch(chalk) {
  const puppeteer = require('puppeteer');

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
}

module.exports.launch = launch;