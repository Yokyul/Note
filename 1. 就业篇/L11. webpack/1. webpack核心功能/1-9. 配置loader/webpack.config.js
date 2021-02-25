module.exports = {
    mode: "development",
    module: {
        rules: [
            // 完整写法：
            {
                test: /index\.js$/,     
                use: [
                    {
                        loader: "./loaders/test-loader",
                        // options用来传递参数，当参数较少的时候可以直接写在loader里，在路径后加上?changeVar:未知数
                        options: {
                            changeVar: "未知数"
                        }
                    }
                ]
            },

            // 简化写法：
            {
                test: /index\.js$/, 
                use: ["./loaders/loader1", "./loaders/loader2"]
            },
            {
                test: /\.js$/,   
                use: ["./loaders/loader3", "./loaders/loader4"]
            }
        ]
    }
}