'use strict'

const jwt = require('jwt-simple')
const findWhere = require('lodash.findwhere')
const fs = require('fs-promise')
const config = require('./lib/utils').config
const ensureAuthenticated = require('./lib/utils').ensureAuthenticated
const generateToken = require('./lib/utils').generateToken
const gutil = require('gulp-util')
const qs = require('querystring')
const request = require('request-promise')
const mockPath = './gulp/server/mockData/user.json'

module.exports = (server) => {
  server.post('/auth/signup', (req, res) => {
    fs.readJson(mockPath)
      .then(data => {
        req.body.id = data.length
        data.push(req.body)
        return fs.outputJson(mockPath, data)
      })
      .then(() => {
        res.json({
          token: jwt.encode(req.body, config.TOKEN_SECRET),
        })
      })
      .catch(err => {
        gutil.log(err)
      })
  })

  server.post('/auth/login', (req, res) => {
    fs.readJson(mockPath)
      .then(file => {
        var user = findWhere(file, {
          email: req.body.email,
        })
        if (user) {
          if (user.password === req.body.password) {
            delete user.password
            const token = generateToken(user)
            res.json({
              token,
              user,
            })
          }else {
            res.status(403).json({
              message: 'forbidden',
            })
          }
        }else {
          res.status(403).json({
            message: 'forbidden',
          })
        }
      })
      .catch(err => {
        gutil.log(err)
        res.status(500).json({
          message: 'server error',
        })
      })
  })

  server.post('/auth/github', (req, res) => {
    const accessTokenUrl = 'https://github.com/login/oauth/access_token'
    const userApiUrl = 'https://api.github.com/user'
    /*eslint camelcase:0*/
    const params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.GITHUB_SECRET,
      redirect_uri: req.body.redirectUri,
    }

    // Step 1. Exchange authorization code for access token.
    request({method: 'GET', url: accessTokenUrl, qs: params })
      .then(accessToken => {
        console.log(accessToken)
        accessToken = qs.parse(accessToken)
        const headers = {'User-Agent': 'Satellizer'}
        // Step 2. Retrieve profile information about the current user.
        return Promise.all([
          request({method: 'GET', uri: userApiUrl, qs: accessToken, headers: headers, json: true}),
          fs.readJson(mockPath),
        ])
      })
      .then(response =>{
        const profile = response[0]
        const users = response[1]
        if (req.headers.authorization) {
          const existingUser = findWhere(users, {
            github: profile.id,
          })
          if (existingUser) {
            res.status(409).send({ message: 'There is already a GitHub account that belongs to you' })
            return existingUser
          }
          var token = req.headers.authorization.split(' ')[1]
          var payload = jwt.decode(token, config.TOKEN_SECRET)
          if (!payload.user) {
            res.status(400).send({ message: 'User not found' })
            throw new Error()
          }
          payload.user.github = profile.id
          payload.user.avatar = profile.avatar_url
          payload.user.name = profile.name
          payload.id = profile.id
          const indexOfUser = users.indexOf(findWhere(users, {
            id: payload.user.id,
          }))
          users[indexOfUser] = payload.user
          return fs.outputJson(mockPath, users)
            .then(() => {
              return payload.user
            })
        } else {
          const existingUser = findWhere(users, {
            github: profile.id,
          })
          if (existingUser) {
            return existingUser
          }
          const user = {
            id: profile.id,
            github: profile.id,
            avatar: profile.avatar_url,
            name: profile.name,
          }
          users.push(user)
          return fs.outputJson(mockPath, users)
            .then(() => {
              return user
            })
        }
      })
      .then(user => {
        const token = generateToken(user)
        res.json({
          token,
          user,
        })
      })
  })

  server.get('/auth/me', ensureAuthenticated, (req, res) => {
    res.json(req.user)
  })
}
