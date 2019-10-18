let {chartBarDemoConfig} = require('./chartconfig')
const fs = require("fs")
const path = require("path")
const renderTemplate = require("any-template-compiler")
let  getChartDemoConfig = function (chartType) {
    // eslint-disable-next-line no-debugger
    debugger;
    let config = {}
    switch (chartType) {
        case LINE:
            break
        case BAR:
            config = chartBarDemoConfig
            break
        case PIE:
            break
        case RING:
            break
    }
    return config
}

const LINE = 1
const BAR = 2
const PIE = 3
const RING = 4
// let tplFile = fs.readFileSync(tplPath);
// let outFile = renderTemplate(tplFile.toString(),{ config: config })
// fs.writeFileSync(prePath,outFile)
let  replaceFileByCompile = function (configs){
    let tplPath = getTplPath()
    let prePath = getPrePath()
    let tplFile = fs.readFileSync(tplPath)
    let outFile = renderTemplate(tplFile.toString(),{ configs: configs })
    // eslint-disable-next-line no-console
    console.log(outFile)
    fs.writeFileSync(prePath,outFile)
}
function getTplPath(){
    console.log(__dirname)
    return path.resolve('./src/components/chart/template/default.tpl')
}
function getPrePath(){
    return path.resolve('./src/components/page/pindex.vue')
}
module.exports = {
    getChartDemoConfig,
    replaceFileByCompile
}