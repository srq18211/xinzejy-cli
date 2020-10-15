const fs = require('fs');
const fsp = require('fs').promises
const handlebars = require('handlebars');
const chalk = require('chalk');

module.exports = async (name) => {
	console.log('name')
	console.log(name)
	if (name) {
		!await fsp.access(name)
			? await fsp.mkdir(name)
			: null

		// 添加页面
		const newPageContent = fs.readFileSync('./template/pageTemplate.vue.hbs').toString()
		const newPage = handlebars.compile(newPageContent)({
			name: name
		});
		let filePath = `./src/views/${name}.vue`
		fs.writeFileSync(filePath, newPage);
		console.log(chalk.green(`🚀${filePath} 创建成功`));
	}

	// 获取页面列表
	const list = fs.readdirSync('./src/views').filter((v) => v !== 'Home.vue').map((v) => ({
		name: v.replace('.vue', '').toLowerCase(),
		file: v
	}));

	// 生成路由定义
	compile({ list }, './src/router.js', './template/router.js.hbs');
	// 生成菜单
	compile({ list }, './src/App.vue', './template/App.vue.hbs');

	/**
     * 
     * @param {*} meta 
     * @param {*} filePath 
     * @param {*} templatePath 
     */
	function compile(meta, filePath, templatePath) {
		if (fs.existsSync(templatePath)) {
			const content = fs.readFileSync(templatePath).toString();
			const result = handlebars.compile(content)(meta);
			fs.writeFileSync(filePath, result);
		}
		console.log(chalk.green(`🚀${filePath} 创建成功`));
	}
};
