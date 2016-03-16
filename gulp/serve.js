'use strict'

const gulp = require('gulp')
const serve = require('gulp-serve')

gulp.task('serve', serve({
  root: ['dist'],
  port: 8080,
}))
