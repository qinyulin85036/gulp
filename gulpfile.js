const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const tinypng = require('gulp-tinypng-compress');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- 常用的方法 --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// 调用方法打印
gulp.task('message', function() {
	return console.log('Gulp is running...');
});

// 拷贝所有的html文件
gulp.task('copyHtml', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

// 压缩图片

/*此方法只能压缩部分，比如说一个图片580K，这个方法只能压缩到510K，但是在tinyPny方法下可以压缩到100多k*/
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
		.pipe(gulp.dest('dist/images'))
);


/*此方法虽然增加了pngquant所谓的深度压缩方法，但是也只能压缩70多K，没什么鸟用*/
//gulp.task('imageMin', () =>
//	gulp.src('src/images/*')
//		.pipe(imagemin({
//          progressive: true,
//          svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//          use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//      }))
//		.pipe(gulp.dest('dist/images'))
//);


/*tinyPng要收费，效果不错，一个非QQ邮箱可以免费500张*/
//gulp.task('tinyPng', () =>
//	gulp.src('src/images/*/*')
//	.pipe(tinypng({
//		key: 'hihwTWDQgxTpmEiyrfocZ17-PJoWCLC9',//qinyulin036@sina.com
//		sigFile: 'images/.tinypng-sigs',
//		log: true
//	})).on('error', function(err) {
//		console.error(err.message);
//	})
//	.pipe(gulp.dest('dist/images'))
//);

// 压缩js
gulp.task('minify', function() {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// 合并scss
gulp.task('sass', function() {
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'scripts','watch']);

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imageMin']);
//	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyHtml']);
});