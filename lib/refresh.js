const fs = require('fs');
const handlebars = require('handlebars');
const chalk = require('chalk');
const compile = require('./tools')
module.exports = async (name) => {
	if (name) {
		// 获取 页面模板 生成 文件内容
		const newPageContent = fs.readFileSync('./template/pageTemplate.vue.hbs').toString()
		const newPage = handlebars.compile(newPageContent)({
			name: name
		});

		// 写入文件到内存
		let filePath = `./src/views/${name}.vue`
		fs.writeFileSync(filePath,newPage);
		console.log(chalk.green(`🚀${filePath} 创建成功`));
	}

	// 获取 页面列表
	const list = fs.readdirSync('./src/views').filter((v) => v !== 'Home.vue').map((v) => ({
		name: v.replace('.vue','').toLowerCase(),
		file: v
	}));

	// 生成 路由定义
	compile({ list },'./src/router.js','./template/router.js.hbs');
	// 生成 菜单link
	compile({ list },'./src/App.vue','./template/App.vue.hbs');
};
