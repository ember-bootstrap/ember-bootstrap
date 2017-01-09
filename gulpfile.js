var gulp = require('gulp');
var conventionalChangelog = require('gulp-conventional-changelog');
var ghPages = require('gulp-gh-pages');
var exec = require('child_process').exec;
var merge = require('merge-stream');

gulp.task('docs', ['docs:publish']);

gulp.task('docs:api', function(cb) {
  exec('ember ember-cli-yuidoc', function(err) {
    cb(err);
  });
});

gulp.task('docs:app', function(cb) {
  exec('ember build --prod', function(err) {
    cb(err);
  });
});

gulp.task('docs:publish', ['docs:api', 'docs:app'], function() {
  return merge(
    gulp.src('docs/api/**/*', { base: 'docs' }),
    gulp.src('CHANGELOG.md'),
    gulp.src('dist/**/*')
  )
    .pipe(ghPages());
});

gulp.task('changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});
