// INCLUDE GULP
var gulp = require('gulp')

// INCLUDE PLUGINS
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var minify = require('gulp-minify')
//var sass = require('gulp-sass');
var sass = require('gulp-sass')(require('node-sass'))
var plumber = require('gulp-plumber')
var jswrap = require('gulp-js-wrapper')
var autoprefixer = require('gulp-autoprefixer')

var browserSync = require('browser-sync').create()
var reload = browserSync.reload

// LINT JS
gulp.task('lint', function () {
  return gulp.src('public/_js/*.js').pipe(jshint()).pipe(plumber()).pipe(jshint.reporter('default'))
})

// COMPILE SASS
gulp.task('sass', function () {
  return gulp
    .src('public/_sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

// CONCATENATE & MINIFY JS
gulp.task('scripts', function () {
  return (
    gulp
      .src(['public/_js/**/*.js', 'public/_js/*.js'])
      .pipe(concat('scripts.js'))
      .pipe(plumber())
      .on('error', function (error) {
        // Would like to catch the error here
        //console.log(error);
        //console.log(error.toString())
        console.log('SCRIPTS ERROR')
        this.emit('end')
      })

      // .pipe(jswrap({
      //     // pass a safe undefined into the encapsulation
      //     opener: '$(document).ready(function() {',
      //     closer: '});'
      // }))

      .pipe(gulp.dest('dist/js'))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
  )
})

// WATCH FILES FOR CHANGES
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  })
  gulp.watch(['public/_js/*.js', 'public/_js/**/*.js'], gulp.series('lint', 'scripts')).on('change', reload)
  gulp.watch(['public/_sass/*.scss', 'public/_sass/**/*.scss'], gulp.series('sass'))
})

// DEFAULT TASK
gulp.task('default', gulp.series('sass', 'lint', 'scripts', 'watch'))
