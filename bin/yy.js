#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
program.version(require('../package.json').version);

program.command('init <name>')
  .description('init project')
  .action(require('../lib/init'));

program.command('g <name>')
  .option('-t --template', 'set template')
  .description('generate page,router')
  .action(require('../lib/refresh'));
program.parse(process.argv);
