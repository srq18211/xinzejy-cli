#!/usr/bin/env node
console.log('cli ... 666')
const program = require('commander')
program.version(require('../package.json').version)

program
    .command('init <name>')
    .description('init project')
    .action(name=>{
        console.log('init' + name)
    })
    program.parse(process.argv)
