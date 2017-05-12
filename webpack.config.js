var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
	  loaders: [
		  {
			  test: /\.ts$/,
			  include: path.resolve(__dirname, 'src'),
			  loader: 'ts-loader'
		  }
	  ]
  },
  resolve: {
	  extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'infoscreen',
      template: 'src/index.template.html'
    }),
    new OpenBrowserPlugin(),
    new CleanWebpackPlugin(
      [
        'dist/bundle-*.js'
      ], {
        root: __dirname,
        verbose: true, // Write logs to console.
        dry: false,
        watch: false,
        //exclude: ['index.html'] 
      }
    )
  ],
  watch: false
};