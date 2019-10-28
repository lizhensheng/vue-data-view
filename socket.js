let {getChartDemoConfig,replaceFileByCompile,replaceChartByCompile,chartCommonConfig} = require('./src/common/js/charthelper')
let {deepCopy} = require('./src/common/js/util')
/**
 * 保存了所有临时的图表的配置
 */
function findStoreIndexById(chartId){
    return globalStore.findIndex((item)=>{return item.chartId == chartId })
}
let createConnection = function createConnection(app) {
    let http = require('http').createServer(app)
    let io = require('socket.io')(http)
    io.on('connection', function(socket){
        replaceFileByCompile([])
        console.log('connected to server');
        socket.on('disconnect', function(){
            console.log('unconnected');
        });
        //用户拖动控件到面板中时触发
        socket.on('onDragInControl',function (config) {
            let configs = JSON.parse(config)
            let oldConfigs = configs.oldConfigs
            let lastConfig = configs.lastConfig
            let comConfig = []
            oldConfigs.forEach(item=>{
                let config = {
                    commonConfig:chartCommonConfig,
                    userConfig:{
                        x:item.xData,
                        y:item.yFields
                    },
                    dataUrl:item.dataUrl,
                    width:item.width,
                    height:item.height,
                    dx:item.x,
                    dy:item.y
                }
                //let copyObj = deepCopy(config)
                comConfig.push({
                    chartId:item.id,
                    config:config,
                    chartType:parseInt(item.chartType)
                })
            })
            let lastChartType = parseInt(lastConfig.chartType)
            let demoConfig = getChartDemoConfig(lastChartType)
            let copyObj = deepCopy(demoConfig)
            copyObj.dx=lastConfig.dx
            copyObj.dy=lastConfig.dy
            //增加图表id
            let chartId = `chart${Date.parse(new Date())}`
            comConfig.push({
                chartId:chartId,
                config:copyObj,
                chartType:lastChartType
            })
            replaceFileByCompile(comConfig)
        });
        //用户在面板中拖动控件时触发
        socket.on('onDragInPanel',function (position) {
            //根据图表id修改globalStore的配置
            // let configPosition = JSON.parse(position)
            // let selectedChartIndex = findStoreIndexById(configPosition.chartId)
            // if(selectedChartIndex>-1){
            //     globalStore[selectedChartIndex].config.dx = configPosition.dx
            //     globalStore[selectedChartIndex].config.dy = configPosition.dy
            //     if(configPosition.width || configPosition.height){
            //         globalStore[selectedChartIndex].config.width = configPosition.width
            //         globalStore[selectedChartIndex].config.height = configPosition.height
            //     }
            //     //replaceFileByCompile(globalStore)
            // }
        });
        //用户在面板中删除控件时触发
        socket.on('onDragRemove',function (chartId) {
            // let selectedChartIndex = findStoreIndexById(chartId)
            // if(selectedChartIndex>-1){
            //     globalStore.splice(selectedChartIndex,1)
            //     replaceFileByCompile(globalStore)
            // }
        })
        //用户定义图表的基础信息
        socket.on('onSingleChartSimpleConfig',function (position) {
            // let configPosition = JSON.parse(position)
            // let selectedChartIndex = findStoreIndexById(configPosition.chartId)
            // refreshSimpleChart(selectedChartIndex,configPosition).then((_config)=>{
            //     //replaceChartByCompile(_config)
            // }).catch(()=>{
            //
            // })
        })
        /**
         * 图表基础信息刷新
         */
        let refreshSimpleChart = (selectedChartIndex,configPosition)=> {
            // return new Promise((resolve, reject) => {
            //     if(selectedChartIndex>-1) {
            //         let _config = globalStore[selectedChartIndex].config
            //         _config.dx = configPosition.dx
            //         _config.dy = configPosition.dy
            //         if (configPosition.width || configPosition.height) {
            //             _config.width = configPosition.width
            //             _config.height = configPosition.height
            //         }
            //         resolve(globalStore[selectedChartIndex])
            //     }else{
            //         reject()
            //     }
            // })
        }
    })

    http.listen(9999, function(){
        console.log('listening on *:9999');
    });
}

module.exports = createConnection