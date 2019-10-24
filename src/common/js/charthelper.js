let {chartBarDemoConfig,chartLineDemoConfig,chartPieDemoConfig,chartRingDemoConfig} = require('./chartconfig')
const fs = require("fs")
const path = require("path")
const renderTemplate = require("any-template-compiler")
/**
 * 获取默认图表配置
 */
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
/**
 * 布局页面的内容的刷新
 */
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
/**
 * 图表组件的内容的刷新
 */
let replaceChartByCompile = function (config) {
    let chartTplPath = getChartTplPath()
    let prePath = getPreChartPath(config.chartId)
    let tplFile = fs.readFileSync(chartTplPath)
    let outFile = renderTemplate(tplFile.toString(),{ config: config })
    fs.writeFileSync(prePath,outFile)
}

/**
 * 获取默认的模板
 */
function getTplPath(){
    return path.resolve('./src/components/chart/template/default.tpl')
}

/**
 * 获取图表的模板
 */
function getChartTplPath(){
    return path.resolve('./src/components/chart/template/chart.tpl')
}

/**
 * 获取布局容器的模板
 */
function getChartContainerTplPath(){
    return path.resolve('./src/components/chart/template/chartcontainer.tpl')
}

/**
 * 获取默认输出布局页面
 */
function getPrePath(){
    return path.resolve('./src/components/page/pindex.vue')
}

/**
 * 获取输出图表的页面
 */
function getPreChartPath(chartid){
    return path.resolve(`./src/components/page/charts/${chartid}.vue`)
}

/**
 * 获取输出布局页面
 */
function getPreChartContainerPath(pageid){
    return path.resolve(`./src/components/page/${pageid}.vue`)
}
module.exports = {
    getChartDemoConfig,
    replaceFileByCompile,
    replaceChartByCompile
}