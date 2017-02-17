'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var del = require('del');

var SRC = './app/src/';
var STYLES = './app/styles/';
var STATIC = './static/';

gulp.task('browserify', function () {
    var b = browserify({
        entries: SRC + 'index.js',
        debug: true
    });

    return b.bundle()
        .pipe(source(STATIC + 'app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src(STYLES + 'app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(STATIC));
});

gulp.task('clean', function () {
    return del.sync([
        STATIC + 'app.css',
        STATIC + 'templates'
    ]);
});

gulp.task('copy', function () {
    gulp.src(SRC + '**/*.html')
        .pipe(gulp.dest(STATIC + 'templates'));
});

//build for dev
gulp.task('build', ['clean', 'copy', 'browserify', 'sass']);