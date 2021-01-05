function watch(argv) {
  const puppeteer = require('puppeteer');
  const chalk = require('chalk');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let reportError = false;

    page.on('console', msg => {
      switch (msg.type()) {
        case 'error':
        case 'assert':
          console.error('\t' + chalk.red('👀  ' + msg.text()));
          reportError = true;
          break;
        case 'info':
          console.log('    ' + chalk.green(msg.text()));
          break;
      }
    });

    for (let i = 0; i < argv.url.length; i++) {
      await page.goto(argv.url[i]);
    }
    
    if (!argv.watch || argv.automation) {
      await browser.close();
      if (reportError)
        throw 'Error';
      else
        process.exit(0);
    }
  })();
}

module.exports.watch = watch;