const path = require('path');
const os = require('os');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const PRODUCTION = env.production;
  const NAME_MODE = PRODUCTION ? '[name].[contenthash]' : '[name]';

  return {
    entry: './src/index.js',
    devtool: PRODUCTION ? false : 'inline-source-map',
    target: PRODUCTION ? 'browserslist' : 'web',
    module: {
      rules: [
        // (PROD) MiniCssExtract for separate css files and lazy loading
        // (DEV) style-loader to add all the styles inside the style tag of the document
        // typings-for-css-modules-loader to generate automatic type definitions
        // css-loader to bundle all the css files into one file
        // postcss-loader to generate vendor prefixes based on browser support
        {
          test: /\.css$/i,
          use: [
            { loader: PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [autoprefixer] } },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    output: {
      filename: `${NAME_MODE}.js`,
      chunkFilename: `${NAME_MODE}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      overlay: true,
      writeToDisk: true,
      historyApiFallback: true,
      open: {
        app: [getChromeBrowser(), '--incognito'],
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [
        // Minimizes Javascript
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: /@license/i,
            },
          },
          extractComments: true,
        }),
        new CssMinimizerPlugin({
          sourceMap: !PRODUCTION,
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new MiniCssExtractPlugin({
        filename: `${NAME_MODE}.css`,
        chunkFilename: `${NAME_MODE}.css`,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      PRODUCTION &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          generateStatsFile: true,
        }),
      PRODUCTION && new CompressionPlugin(),
    ].filter(Boolean),
  };
};

function getChromeBrowser() {
  const platform = process.platform;
  let app = '';

  if (platform === 'linux') {
    app = 'google-chrome';

    // For Windows Subsystem for Linux (WSL)
    if (os.release().toLowerCase().includes('microsoft')) {
      app = '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe';
    }
    // MacOS
  } else if (platform === 'darwin') {
    app = 'Google Chrome';
    // Windows
  } else if (platform === 'win32') {
    app = 'chrome';
  }

  return app;
}
