const {clone} = require('./download')
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
	const data = await figlet('XZ Welcome');
    log(data);
    
    // clone project
    log('🔍 Clone project：'+ name)
    await clone('github:su37josephxia/vue-template',name)

    // install package
    // log('init package')

    // await spawn('npm',['install'],{cwd:`./${name}`})
    log(chalk(`
✨  download successful
👉  Get started with the following commands:`
    ))
    log(chalk.blueBright(`
    cd ${name}
    npm init
    npm run serve
    `))
};
