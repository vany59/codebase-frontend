const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
require('dotenv').config({ path: './.env' })

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: require('os').cpus().length,
    workerParallelJobs: 2,
  },
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [require('autoprefixer')],
  },
}

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `static/js/[hash].js`,
    chunkFilename: `static/js/chunk/[contenthash].chunk.js`,
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'eslint-loader',
          },
          { ...threadLoader },
        ],
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              {
                loader: 'style-loader',
              },
              { loader: 'css-loader' },
              { ...postcssLoader },
              { ...threadLoader },
            ],
          },
          {
            test: /\.(scss|sass)$/,
            sideEffects: true,
            use: [
              {
                loader: 'style-loader',
              },
              { loader: 'css-loader' },
              { ...postcssLoader },
              { loader: 'sass-loader' },
              { ...threadLoader },
            ],
          },
          {
            test: /\.less$/,
            sideEffects: true,
            use: [
              {
                loader: 'style-loader',
              },
              { loader: 'css-loader' },
              { ...postcssLoader },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  modifyVars: {
                    '@font-family': `'Nunito Sans', sans-serif`,
                  },
                },
              },
              { ...threadLoader },
            ],
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `static/assets/images`,
              name: '[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
          { ...threadLoader },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `static/assets/fonts`,
              name: '[hash].[ext]',
            },
          },
          { ...threadLoader },
        ],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    contentBase: path.join(__dirname, './dist'),
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    compress: true,
    inline: true,
    noInfo: true,
    overlay: false,
    clientLogLevel: 'silent',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new WebpackBar(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 512,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'App',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
      silent: true,
    }),
    new FaviconsWebpackPlugin('./public/logo.png'),
  ],
}

module.exports = config
