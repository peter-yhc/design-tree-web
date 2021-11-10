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
          FIREBASE_API_KEY: JSON.stringify('AIzaSyC68OJZAfw0UcFrTEzkzIrYDeDeArCxkhM'),
          FIREBASE_AUTH_DOMAIN: JSON.stringify('inspire-auth.firebaseapp.com'),
          FIREBASE_PROJECT_ID: JSON.stringify('inspire-auth'),
          FIREBASE_STORAGE_BUCKET: JSON.stringify('inspire-auth.appspot.com'),
          FIREBASE_MESSAGING_SENDER_ID: JSON.stringify('1086049283493'),
          FIREBASE_APP_ID: JSON.stringify('1:1086049283493:web:da558e18056762e22b0c4c'),
        },
      },
    }),
  ].filter(Boolean),
});
