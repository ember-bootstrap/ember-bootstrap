var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('deploy', function () {
    return gulp.src('./docs/**/*')
        .pipe(deploy(options));
});
