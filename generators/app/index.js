#!/usr/bin/env node
'use strict'
const Generator = require('yeoman-generator')
const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

module.exports = class extends (
  Generator
) {
  initializing() {
    this.props = {
      name: 'utensil-demo',
      type: 'Vue',
      description: '',
      keywords: [],
      author: '',
      email: '',
    }
  }

  prompting() {
    this.log(`\n欢迎使用${chalk.green('utensil-cli')}！\n`)

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: '项目名称:',
        default: 'utensil-demo',
      },
      {
        type: 'list',
        name: 'type',
        message: '选择框架',
        choices: ['Vue', 'React'],
        default: 'Vue',
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
      },
      {
        type: 'input',
        name: 'keywords',
        message: '请输入项目关键字(用,分割):',
      },
      {
        type: 'input',
        name: 'author',
        message: '请输入作者名称:',
        store: true,
      },
      {
        type: 'input',
        name: 'email',
        message: '请输入作者邮箱:',
        store: true,
      },
    ]

    return this.prompt(prompts).then((props) => {
      this.props.name = props.name
      this.props.type = props.type
      this.props.author = props.author
      this.props.description = props.description
      this.props.keywords = props.keywords
      this.props.email = props.email
    })
  }

  default() {
    const baseName = path.basename(this.destinationPath())
    if (baseName !== this.props.name) {
      this.log(`\n自动创建${this.props.name}目录`)
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    } else {
      this.log(`\n在当前目录创建项目`)
    }
  }

  writing() {
    const templatePath = path.join(__dirname, 'templates', this.props.type + '/**/*')
    this.fs.copy(this.templatePath(templatePath), this.destinationPath(), {
      globOptions: { dot: true },
    })
    this._writingPackageJSON()
  }

  _writingPackageJSON() {
    const templatePath = path.join(__dirname, 'templates', this.props.type + '/package.json')
    this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath('package.json'), {
      name: this.props.name,
      description: this.props.description,
      keywords: this.props.keywords
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i !== ''),
      author: this.props.author,
      email: this.props.email,
    })
  }

  install() {
    this.installDependencies({ bower: false })
  }
}
