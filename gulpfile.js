/* eslint-env node */
const gulp = require('gulp');
const execa = require('execa');
const merge = require('merge-stream');
const striptags = require('striptags');
const transform = require('gulp-transform');
const connect = require('gulp-connect');

gulp.task('docs:api', function () {
  return execa('ember', ['ember-cli-yuidoc']).catch((e) => {
    console.error(e);
    throw e;
  });
});

gulp.task('docs:app', function () {
  return execa('ember', ['builxd', '--prod'], {
    cwd: 'docs',
  }).catch((e) => {
    console.error(e);
    throw e;
  });
});

gulp.task(
  'docs:build',
  gulp.series(gulp.parallel('docs:api', 'docs:app'), function () {
    return merge(
      gulp.src('docs/api/**/*', { base: 'docs' }),
      gulp.src('docs/dist/**/*'),
      gulp.src('CHANGELOG.md').pipe(transform(striptags, { encoding: 'utf8' }))
    ).pipe(gulp.dest('docs/build'));
  })
);

gulp.task('connect', function () {
  connect.server({
    root: 'docs/build',
  });
});

gulp.task('docs:serve', gulp.series('docs:build', 'connect'));
