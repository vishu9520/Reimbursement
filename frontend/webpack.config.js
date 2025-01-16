const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
    clean: true, // Clean the output directory before each build
  },
  mode: 'development', // Set the mode to development
  devtool: 'source-map', // Source maps for easier debugging
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve static files from the dist directory
    port: 3000, // Port for the dev server
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile JavaScript files
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/, // Match assets like images and fonts
        type: 'asset/resource', // Use Webpack's asset/resource module
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions automatically
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template to use
      filename: 'index.html', // Output HTML file
    }),
  ],
};
