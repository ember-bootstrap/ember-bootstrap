/* eslint-env node */
const gulp = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const ghPages = require('gulp-gh-pages');
const exec = require('child_process').exec;
const merge = require('merge-stream');
const striptags = require('striptags');
const transform = require('gulp-transform');

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

gulp.task('docs:publish', gulp.series(gulp.parallel('docs:api', 'docs:app'), function() {
  return merge(
    gulp.src('docs/api/**/*', { base: 'docs' }),
    gulp.src('dist/**/*'),
    gulp.src('CHANGELOG.md').pipe(transform(striptags, { encoding: 'utf8' }))
  )
    .pipe(ghPages());
}));

gulp.task('changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('docs', gulp.series('docs:publish'));
