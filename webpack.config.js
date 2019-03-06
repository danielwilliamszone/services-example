const path = require("path");
const glob = require("glob");

function getFiles(pattern) {
  const entries = {};

  glob.sync(pattern).forEach(file => {
    entries[file.replace("src/", "")] = path.join(__dirname, file);
  });

  return entries;
}

module.exports = {
  entry: getFiles("src/**/*.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty' // Prevent 'fs' error when building
  },
};
