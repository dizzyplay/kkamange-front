const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+.\d+.\d+)?$/,
        use:[{
          loader: "file-loader",
          options:{
            name:'[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'html'),
    port: 9000
  }
}