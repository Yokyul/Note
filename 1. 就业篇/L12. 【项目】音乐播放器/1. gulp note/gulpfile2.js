
/*
	知识点：
	1.全局安装gulp-cli；项目开发环境安装gulp：npm i -D gulp
	2.使用gulp：
		需要在根目录创建gulpfile.js文件(类似于webpack.config.js)，运行gulp命令就是执行此文件。
	3.gulp将每个函数称为一个任务，分为公开认为和私有任务。
	4.任务写法：有两种
		function fn1(cb){
			一堆代码...
			cb();
		}
		或者
		function fn1(){
			return 一堆代码
		}
	5.gulp对象里有许多属性和方法

*/

// 1.gulp命令后不加任何东西，就执行default的任务

// function defaultTask(cb) {
// 	console.log('yuyu');
// 	cb();
// }
// exports.default = defaultTask


// 2.任务分为：公开任务、私有任务



// 3.gulp对象包含许多属性和方法

// const gulp= require('gulp');
// console.log(gulp);


// 4. gulp命令后加上属性名，就执行此属性名的值得任务。

// function fn1(cb) {
// 	console.log('fn1被调用了');
// 	cb();
// }
// exports.build = fn1;


// 5.series(任务1, 任务2, ...) ：表示依次执行任务1，任务2...

// const { series, parallel } = require('gulp');
// function fn2(cb) {
// 	console.log('fn1被调用了');
// 	cb();
// }
// function fn3(cb) {
// 	console.log('fn2被调用了');
// 	cb();
// }
// exports.default = series(fn2, fn3);



/* 
    6.series()和parallel()的区别：
    (1)前者依次执行任务，一个完成再执行下一个；后者同时开始执行任务，依次输出结果。
    (2)前者耗时比后者少。
    (3)前者只要第一个任务出错，直接结束；后者第一个任务出错不会影响其他任务。
*/

// const { series, parallel } = require('gulp');
// function js(cb) {
// 	console.log('js被执行了');
// 	cb();
// }
// function css(cb) {
// 	console.log('css被执行了');
// 	cb();
// }
// function html(cb) {
// 	console.log('html被执行了');
// 	cb();
// }
// exports.series = series(js, css);
// exports.parallel = parallel(js, css);
// exports.default = series(html, parallel(js, css));



/*
    7.处理文件：以流的形式处理，只有一个入口(src方法),一个出口(dest方法)，中间经过许多步骤处理文件(pipe方法)。
    I(input) O(output)
    less文件(入口) -> css -> css加上css3的前缀 -> 压缩 -> 输出(出口)
*/

const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');				// 该插件用来压缩js文件
const rename = require('gulp-rename');              // 该插件用来重命名js文件
exports.default = function () {
	return src('src/js/*.js')						// 入口文件
		.pipe(dest('dist/js'))						// 先输出普通的文件
		.pipe(uglify())								
		.pipe(rename({ extname: '.min.js' }))		// 设置后缀名
		.pipe(dest('dist/js'))						// 再输出压缩后的文件
}


// 8.文件监控：类似watch

const { watch } = require('gulp');
watch('src/css/*',  function (cb) {
	console.log('文件被修改了');
	cb();
});

