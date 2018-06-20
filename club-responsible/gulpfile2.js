var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-htmlmin'),
    reload = browserSync.reload;


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }

    });
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});


gulp.task('watch', function() {
    gulp.watch('./app/scss/*.scss', ['sass', ]);
    gulp.watch('./app/*.html', ['inilinecss']);
    gulp.watch('./app/css/*.css', ['inilinecss']);
});




gulp.task('inilinecss', function() {
    return gulp.src('app/*.html')
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true,
            preserveMediaQueries: true
        }))
        .pipe(gulp.dest('build/'))
        .pipe(reload({ stream: true }));

});


gulp.task('build', function() {
    return gulp.src('build/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build/minified/'))

});



gulp.task('default', ['watch', 'sass', 'inilinecss', 'browser-sync']);