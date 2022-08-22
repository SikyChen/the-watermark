const path = require('path');

const mode = process.env.NODE_ENV || 'production';
const filename = `the-watermark.${mode === 'production' ? 'min.js' : 'js'}`;

module.exports = {
  mode,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename,
    sourceMapFilename: `${filename}.map`,
    library: {
      name: 'Watermark',
      type: 'umd',
      export: 'default',
    },
  },
  devtool: 'source-map',
};