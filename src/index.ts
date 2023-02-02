#!/usr/bin/env node

import { program } from 'commander'
import http from 'node-fetch'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'


program.description("初始化数据").action(async () => {
    try {
        const inquirerResult = await inquirer.prompt([{
            name: 'method',
            type: 'list',
            message: '请选择URL',
            choices: ['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'PATCH', 'OPTIONS'],
            default: "GET"
        }])

        const method = inquirerResult.method

        console.log("初始化数据", chalk.red(method))
    }
    catch (e) {
        console.log(chalk.red('error'))
        console.log(e)
    }
})


program.command('getURLData').description("通过URL获取数据").action(async () => {
    try {
        

        const inquirerResult = await inquirer.prompt([{
            name: 'url',
            type: 'input',
            default: 'https://www.taobao.com',
            message: '请输入URL',
            validate: (url) => { return !!url }
        }])

        const result = await http(inquirerResult.url)

        await fs.writeFileSync('./test.js', await result.text())
    }
    catch (e) {
        console.log(chalk.red('error'))
        console.log(e)
    }
})



program.parse(process.argv)