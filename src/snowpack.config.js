// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    tests: {url: '/', static: false}
  },
  plugins: [],
  installOptions: {},
  devOptions: {
    open: 'none',
    output: 'stream'
  },
  buildOptions: {},
};