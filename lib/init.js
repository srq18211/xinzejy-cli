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
    
    log('🚀 create project：'+ name)
    await clone('github:su37josephxia/vue-template',name)
};
