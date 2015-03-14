var gulp = require('gulp');
var ghpages = require('gh-pages');
var path = require('path');
var file = require('gulp-file');

gulp.task('docs', ['docs:publish']);


gulp.task('docs:generate', function (cb) {
    var exec = require('child_process').exec;
    exec('ember ember-cli-yuidoc', function (err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('docs:copyChangelog', function () {
    return gulp.src('CHANGELOG.md')
        .pipe(gulp.dest('docs'))
});

gulp.task('docs:publish', ['docs:generate','docs:copyChangelog'], function () {
    ghpages.publish(path.join(__dirname, 'docs'), {
        src: '{api/**/*,CHANGELOG.md}',
        add: true
    });
});

gulp.task('docs:changelog', function (done) {
    require('conventional-changelog')({
    }, function(err, log) {
        file('CHANGELOG.md', log, { src: true })
            .pipe(gulp.dest('./'))
            .on('end', done);
    });
});