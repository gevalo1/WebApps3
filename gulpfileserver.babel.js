'use strict';
import gulp from 'gulp';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import ngAnnotate from 'browserify-ngannotate';
import templateCache from 'gulp-angular-templatecache';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import ejs from 'gulp-ejs';
import inject from 'gulp-inject';
import concat from 'gulp-concat';
import minifyCSS from 'gulp-minify-css';
import uglify from 'gulp-uglify';

// Where our files are located
var jsFiles   = "client/app/**/*.js";
var viewFiles = "client/app/**/*.html";

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

gulp.task('default', ['build'], () => {
    console.log("Completed build.");
});

gulp.task('build', ['browserify', 'css'], () => {
    gulp.start('html');
    //gulp.start() will have to be replaced by gulp.series() when gulp 4.0 is released.
});

gulp.task('browserify', ['views'], () => {
    return browserify(['./client/app/app.js'])
            .transform(babelify, {presets: ["es2015"]})
            .transform(ngAnnotate)
            .bundle()
            .on('error', interceptErrors)
            .pipe(source('main.js'))
			.pipe(buffer())
			.pipe(uglify())
            .pipe(gulp.dest('./build/'));
});

gulp.task('css', () => {
    gulp.src('./client/app/*.css')
            .pipe(minifyCSS())
            .pipe(concat('style.css'))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build'));
});

gulp.task('html', () => {
	const sources = gulp.src(['./build/*.js', './build/*.css'], {read: false});
	
    return gulp.src("./client/index.html")
			.pipe(inject(sources, {relative: true, ignorePath: '../build/'}))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./build/'));
});

gulp.task('views', () => {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./client/app/config/'));
});

gulp.task('clean', () => {
    del(['./build/**', '!./build']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
