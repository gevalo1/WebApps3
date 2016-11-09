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
var jsFiles   = "public/app/**/*.js";
var viewFiles = "public/app/**/*.html";

var interceptErrors = (error) => {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('default', ['build', 'browser-sync'], () => {
    gulp.watch(['./views/**.**', './public/**/*'], ['build']);
    gulp.watch('./build/', browserSync.reload());
});

gulp.task('browser-sync', () => {
    browserSync.init(['./build/**.**'], {
        port: 8080,
        proxy: {
            target: 'localhost:8085', // original port
            ws: true // enables websockets
        }
    });
});

gulp.task('nodemon', (cb) => {
    /*var started = false;

    return nodemon({
        script: 'node run dev'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });*/
});

gulp.task('build', ['browserify', 'css'], () => {
    gulp.start('html');
    //gulp.start() will have to be replaced by gulp.series() when gulp 4.0 is released.
});

gulp.task('browserify', ['views'], () => {
    return browserify(['./public/assets/javascripts/main.js', './public/app/app.js'])
            .transform(babelify, {presets: ["es2015"]})
            .transform(ngAnnotate)
            .bundle()
            .on('error', interceptErrors)
            .pipe(source('main.js'))
            .pipe(gulp.dest('./build/'));
});

/*gulp.task('views', () => {
    return gulp.src(viewFiles)
            .pipe(templateCache({
                standalone: true
            }))
            .on('error', interceptErrors)
            .pipe(rename("app.templates.js"))
            .pipe(gulp.dest('./public/config/'));
});*/

gulp.task('css', () => {
    gulp.src('./public/assets/stylesheets/*.css')
            .pipe(minifyCSS())
            .pipe(concat('style.css'))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build'));
});

gulp.task('html', () => {
    return gulp.src("./views/index.ejs")
            .pipe(ejs({}, {ext: '.html'}))
            .pipe(htmlreplace({
                css: 'style.css',
                js: 'main.js'
            }))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build/'));
});

gulp.task('views', () => {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("./public/app/config/app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('clean', () => {
    del(['./build/**', '!./build', '!./build/jquery-3.1.1.min.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
