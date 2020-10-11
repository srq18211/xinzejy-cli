#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
program.version(require('../package.json').version);

// 初始化项目
program
    .command('init <name>')
    .option('-t, --template <name>','初始化项目')
    .description('初始化项目')
    .action(require('../lib/init'));
program
    .command('g <name>')
    .option('-t, --template <name>', '选择模板')
    .description('生成页面，路由')
    .action(require('../lib/refresh'));
program
    .parse(process.argv);
