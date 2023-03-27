import count from "./js/count";
import sum from "./js/sum";
import './css/index.css'
import './less/index.less'
import './sass/index.scss'
import './styl/index.styl'
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

// 安装步骤
/*
npm init - y 生成package.json 初始化
npm i webpack webpack-cli -D 安装 webpack和webpack-cli
npx webpack ./src/main.js --mode=development
npx webpack ./src/main.js --mode=production

*/


