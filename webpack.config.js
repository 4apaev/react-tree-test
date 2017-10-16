const path = process.cwd() + '/src';

module.exports = {

  entry: `${ path }/app.js`,
  output: {
    path,
    library: 'app',
    filename: `app.bundle.js`
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}
