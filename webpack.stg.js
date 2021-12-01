/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commons = require('./webpack.common');

module.exports = merge(commons, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
              ...({
                getCustomTransformers: () => ({
                  before: [ReactRefreshTypeScript()],
                }),
              }),
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        firebaseConfig: {
          FIREBASE_API_KEY: JSON.stringify('AIzaSyC9OpjWap75xpvxrzWEg4G82ttZDg-ZSfA'),
          FIREBASE_AUTH_DOMAIN: JSON.stringify('inspire-dev-ad92f.firebaseapp.com'),
          FIREBASE_PROJECT_ID: JSON.stringify('inspire-dev-ad92f'),
          FIREBASE_STORAGE_BUCKET: JSON.stringify('inspire-dev-ad92f.appspot.com'),
          FIREBASE_MESSAGING_SENDER_ID: JSON.stringify('626751852'),
          FIREBASE_APP_ID: JSON.stringify('1:626751852:web:f0ef6e48c3674a7b4e9b49'),
        },
        serverConfig: {
          HOST: JSON.stringify('https://australia-southeast1-inspire-dev-ad92f.cloudfunctions.net/app'),
        },
      },
    }),
  ].filter(Boolean),
});
