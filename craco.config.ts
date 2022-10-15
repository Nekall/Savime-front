const sassResourcesLoader = require('craco-sass-resources-loader');
 
module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/styles/colors.scss',
          './src/styles/fonts.scss',
          './src/styles/globals.scss'
        ],
      },
    },
  ],
}