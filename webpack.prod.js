const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'Client'
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        // new WorkboxPlugin.GenerateSW()
        new WorkboxPlugin.GenerateSW({
            // These options are for the service worker
            clientsClaim: true, // Automatically claim control of the page when the service worker is activated
            skipWaiting: true,  // Skip waiting phase and activate the service worker immediately
            runtimeCaching: [{
              urlPattern: /\.html$/,
              handler: 'NetworkFirst', // Use 'NetworkFirst' caching strategy for HTML
            }, {
              urlPattern: /\.js$/,
              handler: 'StaleWhileRevalidate', // Use 'StaleWhileRevalidate' for JS files
            }, {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
              handler: 'CacheFirst', // Use 'CacheFirst' for images
            }],
          }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
