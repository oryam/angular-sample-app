'use strict'

const path = require('path')
const gulp = require('gulp')
const yargs = require('yargs')
const template = require('gulp-template')
const rename = require('gulp-rename')

function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

//todo factorize
gulp.task('component', () => {
  const name = yargs.argv.name
  const parentPath = yargs.argv.parent || ''
  const destPath = path.join('src/components', parentPath, name)

  return gulp.src(path.join(__dirname, 'templates', 'component/**/*'))
    .pipe(template({
      name: name,
      upCaseName: cap(name),
    }))
    .pipe(rename(paths => {
      paths.basename = paths.basename.replace('temp', name)
    }))
    .pipe(gulp.dest(destPath))
})

gulp.task('view', () => {
  const name = yargs.argv.name
  let parentPath = yargs.argv.parent || ''
  const destPath = path.join('src/views', parentPath, name)
  const parentPart = parentPath.split('/')
  if (parentPart.length > 1) {
    parentPath = path.basename(parentPath)
  }

  return gulp.src(path.join(__dirname, 'templates', 'view/**/*'))
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      upCaseFull: name.toUpperCase(),
      parent: parentPath,
    }))
    .pipe(rename(paths => {
      paths.basename = paths.basename.replace('temp', name)
    }))
    .pipe(gulp.dest(destPath))
})
