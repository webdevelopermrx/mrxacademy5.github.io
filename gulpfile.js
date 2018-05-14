var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss	 = require('gulp-concat-css');
var ftp			 = require('gulp-ftp');


//Запускаем сервер + отслеживаем sass/html файлы
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./src"
	});

	gulp.watch("src/sass/**/*.sass", ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

//Компилируем sass в css и вставляем изминения в браузер
gulp.task('sass', function(){
	return gulp.src("src/sass/**/*.sass")
	.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
	.pipe(concatCss("style.css"))
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});

// Выгружаем все файлы через FTP на хостинг
gulp.task('ftp', function() {
	return gulp.src('src/**')
	.pipe(ftp({
		host:'localhost',
		user: 'alex',
		pass: '1111',
		remotePath: '/'
		}))
	.pipe(gutil.noop());
});

gulp.task('default', ['serve']);