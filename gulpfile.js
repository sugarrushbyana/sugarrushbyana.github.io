var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bs = require('browser-sync').create();
var babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(bs.reload({stream: true}));
});

/*  first saved in ./*.js 
 *  compiled by babel and saved in dist/js
 *  uglified and concatinated and saved in src/js
 */

// Babel
gulp.task('babel', () =>
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js'))
);

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/babel-polyfill/dist/polyfill.js',
        'dist/js/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(bs.reload({stream: true}));
});

// Browser Sync
gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch Files For Changes
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('js/*.js', ['babel']);
    gulp.watch('dist/js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
});

// Default Task
gulp.task('default', ['sass', 'babel', 'scripts', 'browser-sync']);