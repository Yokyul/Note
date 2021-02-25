const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash:5].js"
    },
}
