var gulp = require('gulp');
var conventionalChangelog = require('gulp-conventional-changelog');
var ghpages = require('gh-pages');
var path = require('path');
var file = require('gulp-file');
var striptags = require('striptags')
var transform = require('gulp-transform');

gulp.task('docs', ['docs:publish']);


gulp.task('docs:generate', function (cb) {
  var exec = require('child_process').exec;
  exec('ember ember-cli-yuidoc', function (err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('docs:copyChangelog', function () {
  return gulp.src('CHANGELOG.md')
    // jekyll seems to have a problem with mixed html/markdown
    // so strip away html for docs
    .pipe(transform(striptags, {encoding: 'utf8'}))
    .pipe(gulp.dest('docs'))
});

gulp.task('docs:publish', ['docs:generate', 'docs:copyChangelog'], function () {
  ghpages.publish(path.join(__dirname, 'docs'), {
    src: '{api/**/*,CHANGELOG.md}',
    add: true
  });
});

gulp.task('docs:changelog', function () {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});
