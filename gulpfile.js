var gulp = require('gulp'),
    livereload = require('gulp-livereload'),// auto-reload browser when files are changed 
    wiredep = require('wiredep').stream,
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),      // run a local dev server
    inject = require('gulp-inject'),    // inject app dependency includes on index.html
    open = require('gulp-open'),     // open a URL in the browser
    environments = require('gulp-environments'),// sets gulp environemnt
    replace = require('gulp-replace');


    var development = environments.development;
    var production = environments.production;

    var source = development() ? "appDev.js" : "app.js";

    var env = process.env.NODE_ENV || 'development';

var appSources = ['./start/'+source],
    jsSources = ['app/*.js'],
    cssSources = ['app/**/*.css'],
    htmlSources = ['**/*.html'];


// Watch
gulp.task('watch', function() {
    gulp.watch(appSources, ['js']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(cssSources, ['css']);
    gulp.watch(htmlSources, ['html']);
});

var paths = ['./bower_components/', './start/'+source,'./app/**/*.js','./app/**/*.css'];


gutil.log(paths);

gulp.task('injectables', function() {
    var sources = gulp.src(paths, {read: false});
    return gulp.src('index.html')
        .pipe(wiredep())
        .pipe(inject(sources))
        .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(connect.reload())
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('app', function(){
        var options = {
            uri: 'http://localhost:8080',
            app: 'Google Chrome'
        };
    gulp.src('./index.html')
        .pipe(open(options));
});

gulp.task('serve', ['connect', 'watch', 'injectables', 'app']);

