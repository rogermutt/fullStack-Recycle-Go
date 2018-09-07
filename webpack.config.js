const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app/index.js',
    output: {
      path: __dirname + '/src/public/js',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader']
            })
        }
      ]
    }
  };