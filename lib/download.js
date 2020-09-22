const download = require('download-git-repo')
const {promisify} = require('util')
module.exports.clone = async (reop,desc)=> {
    promisify(require('download-git-repo'))    
    const ora = require(ora)
    const process = ora(`download ${reop}`)
    await download(repo,desc)
    process.succeed()
}