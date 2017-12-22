var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('build', function(){
    gulp.src('./app/*.js').pipe(gulp.dest('/'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./app/*.js', ['build']);

    nodemon({
        script: 'app/index.js',
        env: { NODE_ENV: 'dev' }
    });
    
});
