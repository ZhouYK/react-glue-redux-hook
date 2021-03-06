/**
 * Created by ink on 2018/4/4.
 */
const path = require('path');


const contentPath = path.resolve(__dirname, '../umd');
// 这里可以路径前一个名称作为页面区分
const entry = {
};
const rules = [{
  enforce: 'pre',
  test: /\.(jsx?)|(tsx?)$/,
  exclude: /node_modules/,
  use: ['eslint-loader'],
}, {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader'],
}];
const plugins = [

];
const config = {
  entry,
  target: 'web',
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins,
};
module.exports = { commonConfig: config, contentPath };
