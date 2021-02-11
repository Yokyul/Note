var path = require("path")
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        index: "./src/index.js"
    },

    // context:path.resolve(__dirname,"src"),

    // output: {
    //     library: "abc",
    //     libraryTarget: "var"
    // },

    // target: "web",

    // module:{
    //     rules:[],
    //     noParse: /jquery/
    // },

    // resolve:{
    //     modules: ["node_modules"],
    //     extensions: [".js", ".json"],
    //     alias: {
    //         "@": path.resolve(__dirname, 'src'),
    //         "_": __dirname
    //       }
    // },

    // externals: {
    //     jquery: "$",
    //     lodash: "_"
    // },

    stats: {
        colors: true,
        modules: false,
        hash: false,
        builtAt: false
    }
}