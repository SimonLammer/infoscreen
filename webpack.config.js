var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/app.ts'
  ],
  devtool: 'source-map',
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
		  {
			  test: /\.ts$/,
			  include: path.resolve(__dirname, 'src'),
			  loader: 'ts-loader'
		  }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        })
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
        'dist/bundle-*',
        'dist/style-*'
      ], {
        root: __dirname,
        verbose: true, // Write logs to console.
        dry: false,
        watch: false,
        //exclude: ['index.html'] 
      }
    ),
    new ExtractTextPlugin({
      filename: 'style-[contenthash].css',
      //disabled: false,
      allChunks: true
    })
  ],
  watch: false
};