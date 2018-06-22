module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(s?)css$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /(node_modules)/
      }
    ]
  }
};
