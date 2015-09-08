(function() {
  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var bump = require('gulp-bump');

  gulp.task('test', function() {
    return gulp.src('test/**/*.js', { read: false })
      .pipe(mocha());
  });

  gulp.task('bump', function() {
    return gulp.src('./package.json')
      .pipe(bump())
      .pipe(gulp.dest('.'));
  });
})();
