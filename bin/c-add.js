#!/usr/bin/env node

// 交互式命名航
const inquirer = require('inquirer')

// 修改控制台字符串的样式
const chalk = require('chalk')

// node内置文件模块
const fs = require('fs')

// 读取根目录下的template.json
const tplObj = require(`${__dirname}/../template`)

// 自定义交互式命名行的问题及简单的校验
let question = [
  {
    name: 'name',
    type: 'input',
    message: '请输入模版名称',
    validate(val) {
      if(val === '') {
        return 'Name is required!'
      } else if(tplObj[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }
  },
  {
    name: 'url',
    type: 'input',
    message: '请输入模版地址',
    validate(val) {
      if(val === '') return 'The url is required!'
      return true
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    // answers 就是用户输入的内容，是个对象
    let { name, url } = answers
    // 过滤unicode字符
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    // 把模版信息写入 template.json文件中
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if(err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
      console.log(chalk.grey('The lastest template list is:\n'))
      console.log(tplObj)
      console.log('\n')
    })
  })
