const webpack = require('webpack')
const path = require('path')

const config = {
  mode: 'production', // Set 'mode' option to 'development' or 'production'
  context: __dirname + '/src',
  entry: {
    background: './background.js',
    content: './content-scripts.js',
    inject: './inject.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
}

module.exports = config;
