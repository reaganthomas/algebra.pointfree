(function() {
  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var bump = require('gulp-bump');

  gulp.task('test', function() {
    return gulp.src('test/**/*.js', { read: false })
      .pipe(mocha({ timeout: 5000 }));
  });

  gulp.task('bump', function() {
    return gulp.src('./package.json')
      .pipe(bump())
      .pipe(gulp.dest('.'));
  });
})();
