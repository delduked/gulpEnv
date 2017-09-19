var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');

// pug Preprocessor
gulp.task('pug', function(){
   return gulp.src('site/pug/index.pug')
      // Specifies which file is will be processed into html
      .pipe(pug({
          pretty: true
      }))
      // Compiles the pug file into HTML
      .pipe(gulp.dest('site'))
      // Specifies where the processed HTML file will reside
      .pipe(browserSync.reload({
         stream: true
      }))
      // Upon pug file being compiled, the Gulp task BrowserSync will reload the page
});
// pug Preprocessor

// Sass Preprocessor
gulp.task('sass', function() {
   return gulp.src('site/css/*.sass')
      .pipe(sass()) //converts sass to css
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('site/css'))
      .pipe(browserSync.reload({
         stream: true
      }))
});
// Sass Preprocessor

// JavaScript Concatenation
gulp.task('concat-js', function() {
   return gulp.src(['site/js/js-lib/jquery.js', 'site/js/js-lib/functions.js'])
      //specify which files are to be combined in which order
      .pipe(concat('all.js'))
      //specifies which file stores the concatenated js files
      .pipe(gulp.dest('site/js'));
      //specifies which folder will contain the concatenated js file
});
// JavaScript Concatenation

// BrowserSync for live reload on file saves
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'site'
      // Specifies which directory will run on the Gulp server
    },
  })
});
// BrowserSync for live reload on file saves

// Combining all Gulp Tasks into one task
gulp.task('default', ['pug','sass','browserSync','concat-js'], function(){
   gulp.watch('site/pug/*.pug', ['pug']);
   gulp.watch('site/css/*.sass', ['sass']);
   gulp.watch('site/js/js-lib/*.js', ['concat-js']);
   gulp.watch('site/*.html', browserSync.reload);
   gulp.watch('site/css/*.css', browserSync.reload);
   gulp.watch('site/img/*', browserSync.reload);
   gulp.watch('site/js/*.js', browserSync.reload);
   // Other watchers
});
// Combining all Gulp Tasks into one task
