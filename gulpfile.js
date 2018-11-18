/* eslint-env node */
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const execa = require('execa');
const merge = require('merge-stream');
const striptags = require('striptags');
const transform = require('gulp-transform');
const insert = require('gulp-insert');

gulp.task('docs:api', function() {
  return execa('ember', ['ember-cli-yuidoc']);
});

gulp.task('docs:app', function() {
  return execa('ember', ['build', '--prod']);
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
  let index = process.argv.indexOf('--tag');
  let args = ['-s'];
  if (index !== -1) {
    let tag = process.argv[index + 1];
    args.push('--next-version', tag);
  }
  return execa('lerna-changelog', args)
    .then(({ stdout }) => {
      return gulp.src('CHANGELOG.md')
        .pipe(insert.prepend(stdout))
        .pipe(gulp.dest('./'));
    });
});

gulp.task('docs', gulp.series('docs:publish'));
