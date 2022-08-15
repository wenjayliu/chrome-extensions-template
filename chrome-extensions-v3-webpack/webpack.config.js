const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rootDir = path.resolve(__dirname, './')
const { version } = require('./package.json')

const config = {
  mode: 'production', // Set 'mode' option to 'development' or 'production'
  entry: {
    background: './src/background.js',
    content: './src/content-scripts.js',
    inject: './src/inject.js',
  },
  output: {
    publicPath: './',
    // path: __dirname + '/dist',
    path: path.resolve(rootDir, './dist/js'),
    filename: '[name].js',
  },
  devServer: {
    // 开发环境生成文件
    devMiddleware: {
      index: true,
      serverSideRender: true,
      writeToDisk: true,
    },
    // before(app, server, compiler) {
    //   reloadServer(app, compiler)
    // },
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包时清空dist目录
    new CopyWebpackPlugin({
      patterns: [
        // 复制`manifest.json`文件并附加版本号
        {
          from: 'src/manifest.json',
          to: path.resolve(rootDir, 'dist/manifest.json'),
          transform: (content) => {
            const jsonContent = JSON.parse(content)
            jsonContent.version = version
            return JSON.stringify(jsonContent, null, 2)
          },
        },
      ],
    }),
  ],
}

module.exports = config
