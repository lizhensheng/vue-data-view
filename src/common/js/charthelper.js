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
let  replaceFileByCompile = function (configs){
    let chartTplPath = getChartTplPath()
    let chartContainerTplPath = getChartContainerTplPath()
    //生成图表父容器
    let containerPath = getPreChartContainerPath('index')
    let containerFile = fs.readFileSync(chartContainerTplPath)
    let outContainerFile = renderTemplate(containerFile.toString(),{configs:configs})
    fs.writeFileSync(containerPath,outContainerFile)
    //生成图表控件
    for(let i = 0;i<configs.length;i++){
        let prePath = getPreChartPath(configs[i].chartId)
        let tplFile = fs.readFileSync(chartTplPath)
        let outFile = renderTemplate(tplFile.toString(),{ config: configs[i] })
        fs.writeFileSync(prePath,outFile)
    }
}
function getTplPath(){
    return path.resolve('./src/components/chart/template/default.tpl')
}
function getChartTplPath(){
    return path.resolve('./src/components/chart/template/chart.tpl')
}
function getChartContainerTplPath(){
    return path.resolve('./src/components/chart/template/chartcontainer.tpl')
}
function getPrePath(){
    return path.resolve('./src/components/page/pindex.vue')
}
function getPreChartPath(chartid){
    return path.resolve(`./src/components/page/charts/${chartid}.vue`)
}
function getPreChartContainerPath(pageid){
    return path.resolve(`./src/components/page/${pageid}.vue`)
}
module.exports = {
    getChartDemoConfig,
    replaceFileByCompile
}