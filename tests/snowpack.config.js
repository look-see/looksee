// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    tests: {url: '/', static: false}
  },
  experiments:{
    source: 'skypack'
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'node .', // production build command
        name: 'looksee',
        // watch: 'node .', // (optional) dev server command
        output: 'stream'
      },
    ]
  ],
  installOptions: {},
  devOptions: {
    output: 'stream'
  },
  buildOptions: {},
};
