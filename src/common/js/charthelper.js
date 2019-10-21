let {chartBarDemoConfig,chartLineDemoConfig,chartPieDemoConfig,chartRingDemoConfig} = require('./chartconfig')
const fs = require("fs")
const path = require("path")
const renderTemplate = require("any-template-compiler")
let  getChartDemoConfig = function (chartType) {
    let config = {}
    switch (chartType) {
        case LINE:
            config = chartLineDemoConfig
            break
        case BAR:
            config = chartBarDemoConfig
            break
        case PIE:
            config = chartPieDemoConfig
            break
        case RING:
            config = chartRingDemoConfig
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
    fs.writeFileSync(prePath,outFile)
}
function getTplPath(){
    return path.resolve('./src/components/chart/template/default.tpl')
}
function getPrePath(){
    return path.resolve('./src/components/page/pindex.vue')
}
module.exports = {
    getChartDemoConfig,
    replaceFileByCompile
}