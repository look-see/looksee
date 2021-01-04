function watch(options, chalk) {
  const puppeteer = require('puppeteer');
  
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let throwError = false;

    page.on('console', msg => {
      switch (msg.type()) {
        case 'error':
        case 'assert':
          console.error('\t' + chalk.red('👀  ' + msg.text()));
          throwError = true;
          break;
        case 'info':
          console.log('    ' + chalk.green(msg.text()));
          break;
      }
    });

    await page.goto('http://localhost:8080/');
    
    if (!options.watch) {
      await browser.close();
      if (throwError)
        throw 'Exit';
      else
        process.exit(0);
    }
  })();
}

module.exports.watch = watch;