const { exec } = require('child_process');
module.exports = function startSnowpack(options) {
  const snowpackConfig = options.snowpack
    ? options.snowpack
    : 'node_modules/looksee/snowpack.config.js';

  const snowpack = exec(`npx snowpack dev --config ${ snowpackConfig } ${ options.open ? '--devOptions.open default' : '' }`);

  snowpack.stdout.on("data", data => {
    console.log(data);
  });

  snowpack.stderr.on("data", data => {
    console.log(`snowpack stderr: ${ data }`);
  });

  snowpack.on('error', (error) => {
    console.log(`snowpack error: ${ error.message }`);
  });

  snowpack.on("close", code => {
    console.log(`snowpack exited with code ${ code }`);
  });
}