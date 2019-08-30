const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');

// BrowserSync for live reload on file saves
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "site",
      stream: true
    },
    port: 3000
  });
  done();
}
// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
// BrowserSync Reload
// BrowserSync for live reload on file saves

// pug Preprocessor
function pugPro() {
   return (
      gulp.src('site/pug/index.pug')
      // Specifies which file is will be processed into html
      .pipe(pug({
          pretty: true
      }))
      // Compiles the pug file into HTML
      .pipe(gulp.dest('site'))
      // Specifies where the processed HTML file will reside
      .pipe(browsersync.reload({
         stream: true
      }))
   );
};
// pug Preprocessor

// Sass Preprocessor
function sassPro() {
   return (
      gulp.src('site/css/*.sass')
      .pipe(sass()) //converts sass to css
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('site/css'))
      .pipe(browsersync.reload({
         stream: true
      }))
   );
};
// Sass Preprocessor

// JavaScript Concatenation
function jsPro(){
   return (
      gulp.src(['site/js/js-lib/jquery.js', 'site/js/js-lib/functions.js'])
      //specify which files are to be combined in which order
      .pipe(concat('all.js'))
      //specifies which file stores the concatenated js files
      .pipe(gulp.dest('site/js'))
      //specifies which folder will contain the concatenated js file
   );
};
// JavaScript Concatenation

//Watch files
function watchFiles() {
   gulp.watch('site/pug/*.pug', gulp.series(pugPro));
   gulp.watch('site/css/*.sass', gulp.series(sassPro));
   gulp.watch('site/js/js-lib/*.js', gulp.series(jsPro));
   gulp.watch(
      [
         'site/*.html',
         'site/css/*.css',
         'site/img/*',
         'site/js/*.js'
      ],
      gulp.series(browserSyncReload)
   );
};
//Watch files

// define tasks to process
const build = gulp.series( pugPro, sassPro, jsPro, browserSync, watchFiles);
// define tasks to process

// export tasks
exports.build = build;
exports.default = build;
