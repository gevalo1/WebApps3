'use strict';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import del from 'del';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import ngAnnotate from 'browserify-ngannotate';
import templateCache from 'gulp-angular-templatecache';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import ejs from 'gulp-ejs';
import htmlreplace from 'gulp-html-replace';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';

// Where our files are located
var jsFiles = "public/assets/javascripts/*.js";
var viewFiles = "views/*.ejs";

var interceptErrors = function (error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch(['./views/**.**', './public/**/*'], ['build']);
    gulp.watch('./build/', browserSync.reload());
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(['./build/**.**'], {
        port: 8080,
        serveStatic: ['./build/'],
        proxy: {
            target: 'localhost:8085', // original port
            ws: true // enables websockets
        }
    });
});

gulp.task('nodemon', (cb) => {
    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('build', ['browserify', 'css'], () => {
    gulp.start('html');
    //gulp.start() will have to be replaced by gulp.series() when gulp 4.0 is released.
});

gulp.task('browserify', ['views'], function () {
    return browserify(['./public/assets/javascripts/main.js'])
            .transform(babelify, {presets: ["es2015"]})
            .transform(ngAnnotate)
            .bundle()
            .on('error', interceptErrors)
            .pipe(source('main.js'))
            .pipe(gulp.dest('./build/'));
});

gulp.task('views', function () {
    return gulp.src(viewFiles)
            .pipe(templateCache({
                standalone: true
            }))
            .on('error', interceptErrors)
            .pipe(rename("app.templates.js"))
            .pipe(gulp.dest('./public/config/'));
});

gulp.task('css', function () {
    gulp.src('./public/assets/stylesheets/*.css')
            .pipe(minifyCSS())
            .pipe(concat('style.css'))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build'))
});

gulp.task('html', function () {
    return gulp.src("./views/index.ejs")
            .pipe(ejs({}, {ext: '.html'}))
            .pipe(htmlreplace({
                css: 'style.css',
                js: 'main.js'
            }))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build/'));
});

gulp.task('clean', () => {
    del(['./build/**', '!./build', '!./build/jquery-1.6.2.min.js', '!./build/jquery.event.drag-2.0.js', '!./build/socket.io.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
