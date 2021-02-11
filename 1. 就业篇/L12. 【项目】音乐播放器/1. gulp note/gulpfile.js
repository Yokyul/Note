const { series, src, dest, watch } = require('gulp');

const htmlClean = require('gulp-htmlclean');		// 该插件用来压缩html文件

const less = require('gulp-less');					// 该插件用来将less文件转化为css文件
const cleanCss = require('gulp-clean-css');			// 该插件用来压缩css文件

const stripDebug = require('gulp-strip-debug');		// 该插件用来去除js文件里的注释和调试语句(如debugger，console)
const uglify = require('gulp-uglify');				// 该插件用来压缩js文件

const imgMin = require('gulp-imagemin');			// 该插件用来压缩图片
const connect = require('gulp-connect');			// 该插件用来配置服务器

// 这个对象用来方便以后修改路径
const folder = {
	src: 'src/',
	dist: 'dist/'
}


function html() {
	return src(folder.src + 'html/*')
		.pipe(htmlClean())
		.pipe(dest(folder.dist + 'html/'))
		.pipe(connect.reload());					// 服务器对象本身的方法reload()，可以重新加载页面
}

function css() {
	return src(folder.src + 'css/*')
		.pipe(less())
		.pipe(cleanCss())
		.pipe(dest(folder.dist + 'css/'))
		.pipe(connect.reload());
}

function js() {
	return src(folder.src + 'js/*')
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(dest(folder.dist + 'js/'))
		.pipe(connect.reload());
}

function image() {
	return src(folder.src + 'images/*')
		.pipe(imgMin())
		.pipe(dest(folder.dist + 'images/'))
}

function server(cb) {
	connect.server({
		port: '1573',		// 端口号
		livereload: true,	// 自动刷新
	});
	cb();
}

// 文件监听，可以避免再次执行gulp命令
watch(folder.src+'html/*',function(cb){
	html();
	cb();
});
watch(folder.src+'css/*',function(cb){
	css();
	cb();
});
watch(folder.src+'js/*',function(cb){
	js();
	cb();
});

exports.default = series(html, css, js, image, server)