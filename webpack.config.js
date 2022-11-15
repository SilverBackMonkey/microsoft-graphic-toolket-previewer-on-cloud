const path = require('path');

module.exports = {
  entry: './src/index.js', // Assuming your main entry file is index.js
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js', // Name of the output file
  },
  // Add any additional configuration options you require
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};