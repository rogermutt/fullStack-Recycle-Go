const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/app/index.js',
    node: {
      fs: 'empty'
    },
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
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    ]
  };