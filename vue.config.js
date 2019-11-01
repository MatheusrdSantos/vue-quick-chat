const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    publicPath: '',
    css: { extract: true },
    configureWebpack: {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                        compress: true,
                        output: {
                            comments: false,
                            beautify: false
                        }
                    }
                })
            ]
        }
    }
};