module.exports = {
    components: 'src/components/**/[A-Z]*.js',
    webpackConfig: {
        module: {
          rules: [
            // Babel loader will use your project’s babel.config.js
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
          ]
        }
      }
};

