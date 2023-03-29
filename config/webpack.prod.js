const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { loader } = MiniCssExtractPlugin;

/**
 * 
 * 打包命令：npx webpack --config ./config/webpack.prod.js
 * 
 * 样式单独提取：npm install --save-dev mini-css-extract-plugin
 * 样式兼容性处理：npm i postcss-loader postcss postcss-preset-env -D
 * 
 * 
 */
function getStyleLoader(pre) {
    return [
        //执行顺序，从右到左，依次执行
        loader,
        "css-loader",//将css资源编译成commonjs的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre
    ].filter(Boolean)
}


module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //所有文件的输出路径
        path: undefined,//开发模式没有输出
        //文件名，入口文件打包输出文件名
        filename: "static/js/main.js",
        //每次打包清空上次输出目录
        clean: true
    },
    //加载器
    module: {
        rules: [
            //处理css
            {
                test: /\.css$/i,//监测xxx文件
                use: getStyleLoader(),
            },
            //处理less资源
            {
                test: /\.less$/i,
                use: getStyleLoader('less-loader'),
            },
            //处理sass资源
            {
                test: /\.s[ac]ss$/i,
                use: getStyleLoader('sass-loader')
            },
            //处理styl资源
            {
                test: /\.styl$/,
                use: getStyleLoader('stylus-loader')
            },
            //处理图片资源
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 4kb
                    }
                },
                generator: {
                    //配置图片打包到 images这个目录下 hash:10 表示哈希值只取10位
                    filename: 'static/images/[hash:10][ext][query]'
                }
            },
            //处理其他资源
            {
                test: /\.(ttf|woff2?|map3|map4|avi)$/,
                type: 'asset/resource',
                generator: {
                    //输出名称
                    filename: 'static/media/[hash:10][ext][query]'
                }
            },
            //配置babel
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, //排除node_modules中的js文件，(这些文件不处理)
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            }
        ]
    },
    //插件
    plugins: [
        new ESLintPlugin({
            //检测那些文件

            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html 文件创建新的html文件
            // 新的html文件特点，1.结构和原来一直。2.自动引入打包输出的资源。
            template: path.resolve(__dirname, '../public/index.html')
        }),
        //css提取成单独的文件
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css'
        }),
        //css压缩处理
        new CssMinimizerPlugin()
    ],
    //模式
    mode: 'production',

}
