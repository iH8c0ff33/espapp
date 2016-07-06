'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let uglify = require('uglify-js-harmony');
let csso = require('csso');
let fs = require('fs');

gulp.task('copy', function () {
    gulp.src([
        'app/*',
        '!app/*.html'
    ], {
        dot: true
    })
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'copy'
        }));
});

gulp.task('html', ['copy'], function () {
    return gulp.src('app/**/*.html')
        .pipe($.replace(/<script src="([^\.]*\.js)"[^>]*>[^<]*<\/script>/g, (s, file) => {
            return '<script>' + uglify.minify('app' + file).code + '</script>';
        }))
        .pipe($.replace(/<link rel="stylesheet" href="([^\.]*\.css)"[^>]*>/g, (s, file) => {
            return '<style>' + csso.minify(fs.readFileSync('app' + file, 'utf8')).css + '</style>';
        }))
        .pipe($.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'html'
        }));
});

gulp.task('default', ['html']);
