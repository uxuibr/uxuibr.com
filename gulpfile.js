var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var watch       = require('gulp-watch');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var rename      = require("gulp-rename");
var del         = require('del');
var minify_css  = require('gulp-minify-css');
var autoprefix  = require('gulp-autoprefixer')
var plumber     = require('gulp-plumber');
var pug         = require('gulp-pug');
var webserver   = require('gulp-webserver');
var dir         = {
    dest: './www',
    src: './src'
};

gulp.task('dirs', () => {
    return console.log('source folder: ' +dir.src+ ' and destination: ' +dir.dest);
});
gulp.task('clean', () => {
  return del(dir.dest + '/*.html');
});
gulp.task('scripts', () => {
    return gulp.src([dir.src + '/scripts/prismic.min.js', dir.src + '/scripts/app.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('application.js', {newLine: ';'}))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dest));
});
gulp.task('styles', function () {
	gulp.src(dir.src + '/stylus/index.styl')
		.pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefix('last 2 versions'))
		.pipe(concat('styles.css'))
		.pipe(minify_css())
        .pipe(rename('styles.min.css'))
		.pipe(gulp.dest(dir.dest));
});
gulp.task('templates', function() {
  gulp.src(dir.src + '/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(dir.dest));
});
gulp.task('stream', function() {
  gulp.watch([dir.src + '/templates/*', dir.src + '/templates/includes/*', dir.src + '/templates/includes/_partials/*'], ['templates']);
  gulp.watch(dir.src + '/scripts/*', ['scripts']);
  gulp.watch(dir.src + '/stylus/*', ['styles']);
  // return del(_www+'/js/app.js');
});
gulp.task('webserver', function() {
  gulp.src(dir.dest)
    .pipe(webserver({
      livereload: true,
      port: 8000
    }));
});
gulp.task('default', ['stream', 'webserver']);