var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-htmlmin'),
    reload = browserSync.reload,
    data = require('gulp-data'),
 replace = require('gulp-replace');


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
    gulp.watch('./app/scss/*.scss', ['sass', 'inilinecss', reload]);
    gulp.watch('./app/views/**/*.pug', ['pug','inilinecss', reload]);
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

gulp.task('be', function() {
    return gulp.src('build/*.html')
    .pipe(replace('https://www.agriconomie.com/media/pub/img/newsletter/header/bertrand.png', 'https://www.agriconomie.com/media/pub/img/newsletter/header/bertrand-be.png'))
    .pipe(replace('https://www.agriconomie.com/media/pub/img/newsletter/header/bertrandMobile.png', 'https://www.agriconomie.com/media/pub/img/newsletter/header/bertrandMobile-be.png'))
    .pipe(replace('https://www.agriconomie.com/media/pub/img/newsletter/header/margaux.png', 'https://www.agriconomie.com/media/pub/img/newsletter/header/margaux-be.png'))
    .pipe(replace('https://www.agriconomie.com/media/pub/img/newsletter/header/margauxMobile.png', 'https://www.agriconomie.com/media/pub/img/newsletter/header/margauxMobile-be.png'))
    .pipe(replace('agriconomie.com', 'agriconomie.be/fr'))
    .pipe(replace('agriconomie.be/fr/media', 'agriconomie.com/media'))
    .pipe(replace('03 52 99 00 00', '019 86 05 55'))
    .pipe(gulp.dest('build/be/'))

});





gulp.task('default', ['watch', 'sass',  'pug', 'inilinecss', 'browser-sync']);