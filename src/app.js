/*eslint angular/document-service:0*/
import 'angular-material/angular-material.css'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css'
import './app.scss'
import angular from 'angular'

import { appConfig, appRun, loadModule, camelCase, vendors } from './app.utils'
import pkg from '../package.json'

/**
 * Array of angular dependencies (vendors and ours)
 * @type {Object}
 */
const dependencies = angular.extend(vendors, loadModule())

/**
 * The name of our app is a camelCase version of the name defined in package.json
 * @type {string}
 */
const appName = camelCase(pkg.name)

/**
 * The main angular module of our app
 * @type {Object}
 */
const appModule = angular.module(appName, dependencies)
  .config(appConfig)
  .run(appRun)

/**
 * the dom element represnting html tag
 * @type {Object}
 */
let domElement = document.querySelector('html')

/**
 * When everything is ready start angular
 */
angular.bootstrap(domElement, [appName])

export default appModule.name
