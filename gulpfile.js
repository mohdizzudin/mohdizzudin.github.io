const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()

function vendor() {
  const bootstrap = gulp
    .src(['./node_modules/bootstrap/dist/**/*'], { encoding: false })
    .pipe(gulp.dest('./vendor/bootstrap'))

  const fontAwesome = gulp
    .src(
      [
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/**}',
        '!./node_modules/font-awesome/{scss,scss/**}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}',
      ],
      { encoding: false }
    )
    .pipe(gulp.dest('./vendor/font-awesome'))

  const jquery = gulp
    .src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js'], {
      encoding: false,
    })
    .pipe(gulp.dest('./vendor/jquery'))

  const jqueryEasing = gulp
    .src(['./node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  const simpleLineFonts = gulp
    .src(['./node_modules/simple-line-icons/fonts/**'], { encoding: false })
    .pipe(gulp.dest('./vendor/simple-line-icons/fonts'))

  const simpleLineCss = gulp
    .src(['./node_modules/simple-line-icons/css/**'])
    .pipe(gulp.dest('./vendor/simple-line-icons/css'))

  return Promise.all([
    streamToPromise(bootstrap),
    streamToPromise(fontAwesome),
    streamToPromise(jquery),
    streamToPromise(jqueryEasing),
    streamToPromise(simpleLineFonts),
    streamToPromise(simpleLineCss),
  ])
}

function streamToPromise(stream) {
  return new Promise(function (resolve, reject) {
    stream.on('end', resolve)
    stream.on('error', reject)
  })
}

function cssCompile() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
}

function cssMinify() {
  return gulp
    .src(['./css/*.css', '!./css/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
}

function jsMinify() {
  return gulp
    .src(['./js/*.js', '!./js/*.min.js', '!./js/vue.js', '!./js/vue.min.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream())
}

function serve(done) {
  browserSync.init({
    server: { baseDir: './' },
    open: false,
  })
  done()
}

function watch() {
  gulp.watch('./scss/**/*.scss', gulp.series(cssCompile, cssMinify))
  gulp.watch(['./js/*.js', '!./js/*.min.js'], jsMinify)
  gulp.watch('./*.html').on('change', browserSync.reload)
}

const css = gulp.series(cssCompile, cssMinify)
const js = jsMinify
const build = gulp.parallel(css, js, vendor)
const dev = gulp.series(css, js, serve, watch)

exports.vendor = vendor
exports.css = css
exports.js = js
exports.default = build
exports.dev = dev
