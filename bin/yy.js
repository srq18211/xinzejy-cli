#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
program.version(require('../package.json').version);

program.command('init <name>')
  .description('初始化项目')
  .action(require('../lib/init'));

program.command('g <name>')
  // .option('-t --template', 'set template')
  .description('生成页面，路由')
  .action(require('../lib/generat.js'));

program.command('node [port]')
  .description('查找指定端口的 node 进程')
  .action(require('../lib/nodelist.js'))
program.parse(process.argv);

