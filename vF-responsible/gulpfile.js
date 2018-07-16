var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-htmlmin'),
    reload = browserSync.reload,
    data = require('gulp-data');


        function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }

    });
});


gulp.task('pug', function () {
  gulp.src('./app/views/index.pug')
    .pipe(data(function(file) {
      return requireUncached('./app/data/data.json');
    }))
    .on("error", function(err) { console.log("Error : " + err.message); })
    .pipe(pug({
      pretty: true
    }))
    .on("error", function(err) { console.log("Error : " + err.message); })
    .pipe(gulp.dest('./app'))
    .on("error", function(err) { console.log("Error : " + err.message); })
    .pipe(reload({stream:true}));
});


gulp.task('sass', function() {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});


gulp.task('watch', function() {
    gulp.watch('./app/scss/*.scss', ['sass', 'inilinecss']);
    gulp.watch('./app/views/**/*.pug', ['pug','inilinecss']);
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





gulp.task('default', ['watch', 'sass',  'pug', 'inilinecss', 'browser-sync']);