const { spawn, exec } = require('child_process');
const log = (content) => console.log(chalk.green(content));
const chalk = require('chalk');
const inquirer = require('inquirer')
module.exports = async (port) => {
    // if (name == 'list') {
    log(chalk(`查看所有 node 进程`))
    // const proc = spawn(`tasklist |findstr node`);
    // 模拟 cmd命令： tasklist | findstr 'node'
    const netstat = spawn(`netstat`, ['-nao']);
    const findstr = spawn(`findstr`, port ? [`${port}`] : []);

    // proc.stdout.pipe(process.stdout);
    // proc.stderr.pipe(process.stderr);

    netstat.stdout.on('data', (data) => {
        findstr.stdin.write(data)
    });
    netstat.on('close', () => {
        findstr.stdin.end()
    });

    findstr.stdout.on('data', async data => {
        const datastr = data.toString()
        console.log('datastr')
        console.log(datastr)
        const pids = datastr.split(/\r\n/).map(i => {
            let pid = i.split(/\s/g).filter(i => i).slice(-1)
            return pid.length ? pid[0] : null
        })
        let unique = [...new Set(pids)]
        let result = unique.filter(i => {
            return /\w+/.test(i) && !!i
        })

        const questions = [{
            type: 'input',
            name: 'close',
            message: '全部关闭 y/n ?',
            default: 'y'
        }];
        const answers = await inquirer.prompt(questions);

        if (answers.close === 'y') {
            result.forEach(pid => {
                console.log('pid')
                console.log(pid)
                spawn(`taskkill`, ['/f', '/pid', `${pid}`]);
            })
        } else {
            const answers2 = await inquirer.prompt([{
                type: 'input',
                name: 'closePid',
                message: '输入要关闭的进程 pid',
            }])
            if (answers2.closePid) {
                spawn(`taskkill`, ['/f', '/pid', `${answers.closePid}`]);
            }
        }
    })
}
