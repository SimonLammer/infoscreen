module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
    ],
    files: ['tests/test_index.js'],
    exclude: [
    ],
    preprocessors: {
      'tests/test_index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.ts']
      },
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'PhantomJS',
      'Chrome',
      'Firefox',
      // 'Opera',
      'IE',
    ],
    singleRun: false,
    concurrency: Infinity
  });
};