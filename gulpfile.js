var sass = require('gulp-sass');
var path = require('path');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var gulp = require('gulp');
var watch = require('gulp-watch');

var styleFiles = [
  'node_modules/bootstrap/dist/css/bootstrap.css',
  'src/style/main.scss',

];

var scriptFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'src/vendor/**/*.js',
  'src/js/**/*.js',
];

var pathsToClean = [
  './static/css',
  './static/js',
];

var templateFiles = [
  './src/templates/header.html',
  './src/templates/mainScreen.html',
  './src/templates/footer.html',
];

gulp.task('styles', function () {
  return gulp.src(styleFiles)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('scripts', function() {
  return gulp.src(scriptFiles)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./static/js'))
});

gulp.task('images', function(){
	return gulp.src('./src/images/**.*')
	.pipe(gulp.dest('./static/images'));
});

gulp.task('templates', function(){
	return gulp.src(templateFiles)
  .pipe(concat('index.html', {map: false}))
	.pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    return gulp.src(pathsToClean, {read: false})
        .pipe(clean());
});

gulp.task('build', ['templates', 'images', 'styles', 'scripts']);

gulp.task('watch', function() {
    // watch many files
  watch(['./src/**/*.*'], function() {
        gulp.start('build');
    });
});
