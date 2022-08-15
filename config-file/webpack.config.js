const webpack = require('webpack');
const path = require('path')
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyESPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src',
  entry: {
    'background': './background.js',
    'content': './content.js',
    'startup': './startup.js',
    'inject': './inject.js',
    'injectStart': './injectStart.js',
	'config': './config.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve:{
      extensions: ['.js', '.vue', '.json'],
    },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/images/',
          emitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/fonts/',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
	new UglifyESPlugin({
	  // 多嵌套了一层
	  uglifyOptions: {
		compress: {
		  // 在UglifyJs删除没有用到的代码时不输出警告
		  // warnings: false,
		  // 删除所有的 `console` 语句，可以兼容ie浏览器
		  drop_console: true,
		  // 内嵌定义了但是只用到一次的变量
		  collapse_vars: true,
		  // 提取出出现多次但是没有定义成变量去引用的静态值
		  reduce_vars: true,
		},
		output: {
		  // 最紧凑的输出
		  beautify: false,
		  // 删除所有的注释
		  comments: false,
		}
	  }
	}),
    new CopyPlugin([
      { from: 'icons', to: 'icons', ignore: ['icon.xcf'] },
      { from: 'content.css', to: 'content.css'},
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: (content) => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (config.mode === 'development') {
            jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }

          return JSON.stringify(jsonContent, null, 2);
        },
      },
    ]),
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: __dirname + '/src/manifest.json',
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;

