// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: {url: '/'}
  },
  plugins: [],
  installOptions: {
    treeshake: true
  },
  devOptions: {},
  buildOptions: {
    out: 'bin'
  }
};
