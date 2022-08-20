const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'watermark-plugin.js',
    library: {
      type: 'umd',
    },
  },
};