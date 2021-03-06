/**
 * @file webpack.config.js
 * @author lijianan
 */


const path = require('path');
const NODE_ENV = process.env.NODE_ENV; // 获取环境变量
const isProd = NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次构建清除上一次打包出来的文件
const nodeExternals = require('webpack-node-externals');
const plugins = isProd ? [new CleanWebpackPlugin()] : [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'public/index.html'
    }),
]

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: isProd ? './src/components/index.js' : './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: isProd ? 'commonjs2' : undefined,  // 包需要被module.exports，这就要用到common
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),  
            '@for-u': path.resolve(__dirname, './src/components'),  // 配置绝对路径
        }
    },
    devServer: {
        open: true,
        hot: true, //启用热更新
        // contentBase: path.resolve(__dirname, './public'), // webpack 5 移除
    },
    externals: isProd ? [nodeExternals()] : [], // nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。
    plugins,
};