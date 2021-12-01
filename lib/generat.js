const fs = require('fs');
const path = require('path')
const fsp = require('fs').promises
const { clone } = require('./download')
const compile = require('./tools')
module.exports = async (name) => {
	await fsp.mkdir(name, () => { })
	await fsp.mkdir(`${name}/config/`, () => { })
	const tempDir = `${name}_templates`
	await clone('github:srq18211/yy-cli-templates', tempDir)
	// await clone('github:srq18211/xinzejy-cli-template','zzzz')

	compile({}, `./${name}/store.js`, path.join(`./${tempDir}/store.js.hbs`))
	compile({}, `./${name}/index.js`, path.join(`./${tempDir}/indexTemp.js.hbs`))
	compile({}, `./${name}/config/index.js`, path.join(`./${tempDir}/configTemp.js.hbs`))
	compile({}, `./${name}/config/search.js`, path.join(`./${tempDir}/searchTemp.js.hbs`))
	compile({}, `./${name}/config/fields.js`, path.join(`./${tempDir}/fieldsTemp.js.hbs`))
};
