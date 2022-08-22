const path = require('path');

console.log('node env: ', process.env.NODE_ENV)

const mode = process.env.NODE_ENV || 'production';
const filename = `the-watermark.${mode === 'production' ? 'min.js' : 'js'}`;

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename,
    sourceMapFilename: `${filename}.map`,
    library: {
      type: 'umd',
    },
  },
  devtool: 'source-map',
};