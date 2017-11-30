var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('build', function(){
    
    gulp.src('*.js')
        .pipe(gulp.dest('/'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('.*.js', ['build']);

    nodemon({
        script: 'index.js',
        env: { NODE_ENV: 'dev' }
    });
    
});