'use strict'

const path = require('path')
const gulp = require('gulp')
const watch = require('gulp-watch')
const glob = require('glob-promise')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const gutil = require('gulp-util')

let instance

function initServer() {
  const server = jsonServer.create()
  server.use(jsonServer.defaults())
  server.use(bodyParser.json())
  return glob(path.join('gulp/server/modules/**/index.js'))
    .then(modules => {
      modules.forEach(module => {
        require(`./${module.replace('gulp/', '').replace('/index.js', '')}`)(server)
      })
      return glob('gulp/server/mockData/*.json')
    })
    .then(mocks => {
      const db = {}
      mocks.forEach(mock =>{
        db[mock.replace('gulp/server/mockData/', '').replace('.json', '')] = require(`./${mock.replace('gulp/', '')}`)
      })
      const router = jsonServer.router(db)
      server.use(router)
      instance = server.listen(3000, () => {
        gutil.log('web-service listening on port 3000')
      })
    })
}

/*eslint angular/timeout-service:0*/
gulp.task('json-server', () => {
  initServer()
  watch('gulp/server/mockData/*', () => {
    instance.close()
    setTimeout(() => {
      initServer()
    }, 500)
  })
})
