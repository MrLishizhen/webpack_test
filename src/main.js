import count from "./js/count";
import sum from "./js/sum";
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

// 安装步骤
/*
npm init - y 生成package.json 初始化
npm i webpack webpack-cli -D 安装 webpack和webpack-cli
npx webpack ./src/main.js --mode=development
npx webpack ./src/main.js --mode=production

*/


