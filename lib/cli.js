#!/usr/bin/env node
'use strict'
const yeoman = require('yeoman-environment')
const yeomanEnv = yeoman.createEnv()
const GeneratorNPM = require('../generators/app/index')
yeomanEnv.registerStub(GeneratorNPM, 'utensil')

yeomanEnv.lookup(() => {
  yeomanEnv.run('utensil', (err) => {
    if (err) {
      console.log('项目初始化失败', err)
    }
  })
})
