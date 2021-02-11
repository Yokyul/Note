const webpack = require("webpack")

module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            PI: `Math.PI`,                      // PI = Math.PI
            VERSION: `"1.0.0"`,                 // VERSION = "1.0.0"
            DOMAIN: JSON.stringify("duyi.com")  // DOMAIN = "duyi.com"
        }),
        new webpack.BannerPlugin({
            banner: `
            hash:[hash]
            chunkhash:[chunkhash]
            name:[name]
            author:yujie
            corporation:home
            `
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash'
        })
    ]
}