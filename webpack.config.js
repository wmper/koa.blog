const path = require('path')
const process = require('process')
const WebpackNodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    target: 'node',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'app.js'
    },
    resolve: {
        modules: ['./src'],
        extensions: ['.js']
    },
    module: {},
    externals: [
        WebpackNodeExternals() // 排除`node_modules`中的依赖
    ],
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: __dirname + '/src/public', to: __dirname + '/dist/public' },
                { from: __dirname + '/src/views', to: __dirname + '/dist/views' },
                { from: __dirname + '/src/launcher.js', to: __dirname + '/dist/launcher.js' }
            ]
        })
    ]
}
