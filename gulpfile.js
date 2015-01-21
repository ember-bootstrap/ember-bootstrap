var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

gulp.task('docs', ['docs:publish']);

gulp.task('docs:readme', function (cb) {
    return gulp.src('README.md')
        .pipe(gulp.dest('docs'));
});


gulp.task('docs:generate', function (cb) {
    var exec = require('child_process').exec;
    exec('ember yuidoc', function (err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('docs:publish', ['docs:generate','docs:readme'], function () {
    return gulp.src('./docs/**/*')
        .pipe(deploy({

        }));
});
