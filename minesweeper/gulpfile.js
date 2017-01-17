/*
 * Configurations
 */

var config = {
    'root': 'dist/',
    'src' : 'src/',
    'dist': 'dist/'
}


/*
 * Requires
 */

var gulp         = require('gulp'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    minify       = require('gulp-minify'),
    sourcemaps   = require('gulp-sourcemaps'),
    connect      = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin');


/*
 * Tasks
 */

// Connect
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});


// HTML
gulp.task('html', () => {
    return gulp.src(config.src + '*.html')
        .pipe(gulp.dest(config.dist))
        .pipe(connect.reload())
        .pipe(notify('HTML updated: <%= file.relative %>'))
})


// Sass
gulp.task('sass', function(){
    return gulp.src(config.src + 'scss/*.scss')
        .pipe(plumber({errorHandler: notify.onError('Error : <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(config.dist + 'assets/css'))
        .pipe(connect.reload())
        .pipe(notify('Saas compiled : <%= file.relative %> !'));
});


// Javascript
gulp.task('javascript', function() {
    return gulp.src(config.src + 'js/*.js')
        .pipe(plumber({errorHandler: notify.onError('JS Error : <%= error.message %> ! ')}))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            ignoreFiles: ['.min.js'],
            noSource: false,
        }))
        .pipe(gulp.dest(config.dist + 'assets/js'))
        .pipe(connect.reload())
        .pipe(notify('JS compiled : <%= file.relative %> !'));
});

// Images
gulp.task('images', function() {
    return gulp.src(config.src + 'img/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist + 'assets/img'))
        .pipe(connect.reload())
        .pipe(notify('Images minified : <%= file.relative %> !'));
})


// Fonts
gulp.task('fonts', function() {
    return gulp.src(config.src + 'font/**/*')
        .pipe(gulp.dest(config.dist + 'assets/font'))
        .pipe(connect.reload())
        .pipe(notify('Fonts updated : <%= file.relative %> !'));
})


// Watch
gulp.task('watch', function() {
    gulp.watch([config.src + 'js/*.js'], ['javascript']);
    gulp.watch([config.src + 'scss/**/*.scss'], ['sass']);
    gulp.watch([config.src + '*.html'], ['html']);
    gulp.watch([config.src + 'img/*'], ['images']);
    gulp.watch([config.src + 'font/*'], ['fonts']);
})


// Build
gulp.task('build', ['html', 'sass', 'javascript', 'images', 'fonts'], function() {})


// Default
gulp.task('default', ['build', 'connect', 'watch'], function() {})
