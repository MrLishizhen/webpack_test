const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');

/*
npx webpack serve --config ./config/webpack.dev.js 启动命令

*/

module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),//绝对路径
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
                use: [
                    //执行顺序，从右到左，依次执行
                    "style-loader",
                    "css-loader"//将css资源编译成commonjs的模块到js中
                ],
            },
            //处理less资源
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            //处理sass资源
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            //处理styl资源
            {
                test: /\.styl$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'stylus-loader',
                ], // 将 Stylus 文件编译为 CSS
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
        })
    ],
    //服务启动命令： npx webpack serve
    devServer: {
        host: 'localhost', //启动服务器域名
        port: '3000', //启动服务器端口号
        open: true, //是否自动打开浏览器
    },
    //模式
    mode: 'development',

}
