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
  return execa('ember', ['build', '--prod']).catch((e) => {
    console.error(e);
    throw e;
  });
});

gulp.task(
  'docs:build',
  gulp.series(gulp.parallel('docs:api', 'docs:app'), function () {
    return merge(
      gulp.src('api/**/*', { base: '.' }),
      gulp.src('dist/**/*'),
      gulp
        .src('../CHANGELOG.md')
        .pipe(transform(striptags, { encoding: 'utf8' })),
    ).pipe(gulp.dest('build'));
  }),
);

gulp.task('connect', function () {
  connect.server({
    root: 'build',
  });
});

gulp.task('docs:serve', gulp.series('docs:build', 'connect'));
