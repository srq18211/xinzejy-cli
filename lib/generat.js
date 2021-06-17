const fs = require('fs');
const path = require('path')
const fsp = require('fs').promises
const { clone } = require('./download')
const compile = require('./tools')
module.exports = async (name) => {
	// await fsp.mkdir(name,() => { })
	// await fsp.mkdir(`${name}/config/`,() => { })
	await fsp.mkdir(`${name}_templates/`,() => { })
	const tempDir = `${name}_templates/`
	console.log('tempDir')
	console.log(tempDir)
	await clone('gitee:xinzejy/table-render',tempDir)

	// compile({},'./table/store.js',path.join(`./${name}_templates/store.js.hbs`))
	// compile({},'./table/index.js',path.join(`./${name}_templates/indexTemp.js.hbs`))
	// compile({},'./table/config/index.js',path.join(`./${name}_templates/configTemp.js.hbs`))
	// compile({},'./table/config/search.js',path.join(`./${name}_templates/searchTemp.js.hbs`))
	// compile({},'./table/config/fields.js',path.join(`./${name}_templates/fieldsTemp.js.hbs`))
};
