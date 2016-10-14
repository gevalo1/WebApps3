var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins(),
	del = require('del');

gulp.task('scripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/assets/js'));
	console.log("Scripts task complete");
});

gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('watch', function() {
  //gulp.watch('public/stylesheets/**/*.css', ['styles']);
  gulp.watch('public/javascripts/*.js', ['scripts']);
  plugins.livereload.listen();
  gulp.watch(['./**']).on('change', plugins.livereload.changed);
});