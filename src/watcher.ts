function watch(options, chalk) {
  const puppeteer = require('puppeteer');
  
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

    await page.goto(options.server || 'http://localhost:8080');
    
    if (!options.watch || options.automation) {
      await browser.close();
      if (reportError)
        throw 'Error';
      else
        process.exit(0);
    }
  })();
}

module.exports.watch = watch;