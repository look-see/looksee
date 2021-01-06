// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: {url: '/bin'}
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      {
        // Copy files needed for npm package publishing
        cmd: 'cp package.json publish && cp README.md publish && cp assets/logo.png publish',
      },
    ]
  ],
  installOptions: {
    treeshake: true
  },
  devOptions: {},
  buildOptions: {
    out: 'publish',
    clean: true,
  }
};