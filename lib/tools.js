const fs = require('fs')
const handlebars = require('handlebars');
// handlebars.registerHelper('BigHump',function (string) {
  
// })
const chalk = require('chalk');
/**
     * 
     * @param {*} meta 
     * @param {*} filePath 
     * @param {*} templatePath 
     */
module.exports = async (meta,filePath,templatePath) => {
  // console.log(filePath,templatePath);
  // if (fs.existsSync(templatePath)) {
  //   const content = await fs.readFileSync(templatePath).toString();
  //   const result = await handlebars.compile(content)(meta);
  //   fs.writeFileSync(filePath,result);
  // }
  // console.log(chalk.green(`🚀${filePath} 创建成功`));
}