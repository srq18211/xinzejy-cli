/**
 * 初始化项目：远程库拉取代码
 */
const { clone } = require('./download')

// clone 成功后执行的 函数
const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise((resolve) => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on('close', () => {
            resolve();
        });
    });
};

const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
    clear();
    const data = await figlet('Welcome YiYangKeJi');
    log(data);

    // clone project
    log(`🔍 Clone to project：${name}`)
    await clone('github:srq18211/xinzejy-cli-template', name)

    // install package
    // log('init package')
    
    // clone 成功后 执行命令
    // await spawn('npm',['install'],{cwd:`./${name}`})
    log(chalk(`
✨  download successful
👉  Get started with the following commands:`
    ))
    log(chalk.blueBright(`
    cd ${name}
    npm install
    npm run serve
    `))
};
