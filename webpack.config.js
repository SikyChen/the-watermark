const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'watermark.js',
    library: {
      type: 'umd',
    },
  },
  watch: true,
};