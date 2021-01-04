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
  plugins: [],
  installOptions: {},
  devOptions: {
    output: 'stream'
  },
  buildOptions: {},
};
