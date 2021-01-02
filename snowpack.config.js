// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: {url: '/'}
  },
  plugins: [],
  installOptions: {},
  devOptions: {},
  buildOptions: {
    out: 'bin'
  },
};
