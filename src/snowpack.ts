function start(options) {
  const { exec } = require('child_process');
  const snowpackConfig = options.snowpack
    ? options.snowpack
    : 'node_modules/looksee/snowpack.config.js';

  const snowpack = exec(`npx snowpack dev --config ${ snowpackConfig } ${ options.open ? '--devOptions.open default' : '' }`);

  snowpack.stdout.on("data", data => {
    console.log('\n' + data);
  });

  snowpack.stderr.on("data", data => {
    console.log(`\nsnowpack stderr: ${ data }`);
  });

  snowpack.on('error', (error) => {
    console.log(`\nsnowpack error: ${ error.message }`);
  });

  snowpack.on("close", code => {
    console.log(`\nsnowpack exited with code ${ code }`);
  });
}

module.exports.start = start;