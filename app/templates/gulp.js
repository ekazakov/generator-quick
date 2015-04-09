'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');
var transform = require('vinyl-transform');

var filename = path.join(__dirname, 'tests/index.js');

gulp.task('default', function () {
    rebundle();
});

var bundler = watchify(browserify(filename, watchify.args));

bundler.on('update', rebundle);
bundler.on('log', gutil.log);

function rebundle (files) {
    gutil.log('changed files:', files);
    var bundle = transform(function () {
        return bundler.bundle();
    });

    return gulp.src(filename)
        .pipe(bundle)
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(gulp.dest('js'))
    ;
}
