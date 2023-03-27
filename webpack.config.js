const path = require('path'); // nodejs核心模块，专门用来处理路径问题

module.exports={
    //入口
    entry:'./src/main.js',
    //输出
    output:{
        //输出路径
        path:path.resolve(__dirname,'dist'),//绝对路径
        //文件名
        filename: "main.js"
    },
    //加载器
    module:{
      rules: [
        {
          test: /\.css$/i,//监测xxx文件
          use: [
            //执行顺序，从右到左，依次执行
            "style-loader",
            "css-loader"//将css资源编译成commonjs的模块到js中
          ],
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
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
      ]
    },
    //插件
    plugins: [],
    //模式
    mode:'development'
}
