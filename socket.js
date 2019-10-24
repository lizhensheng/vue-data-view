let {getChartDemoConfig,replaceFileByCompile,replaceChartByCompile} = require('./src/common/js/charthelper')
let {deepCopy} = require('./src/common/js/util')
/**
 * 保存了所有临时的图表的配置
 */
let globalStore = []
function findStoreIndexById(chartId){
    return globalStore.findIndex((item)=>{return item.chartId == chartId })
}
let createConnection = function createConnection(app) {
    let http = require('http').createServer(app)
    let io = require('socket.io')(http)
    io.on('connection', function(socket){
        console.log('连接上服务器了');
        replaceFileByCompile(globalStore)
        //创建一个当前连接用户的设计面板的页面
        console.log(socket.id);
        // let prePath= path.join(__dirname,'src','components','chart','preview','preview.vue');
        // let preCreatePath= path.join(__dirname,'src','components','chart','preview',`preview-${socket.id}.vue`);
        // fs.access(preCreatePath,(err)=>{
        //     if(err.code == "ENOENT"){
        //         fs.copyFile(prePath,preCreatePath,function(err){
        //             console.log(err);
        //         })
        //     }
        // })

        socket.on('disconnect', function(){
            console.log('断开服务器连接了');
        });
        socket.on('onChartConfig', function(config){
            console.log(socket.id)
            // let tplPath= path.join(__dirname,'src','components','chart','bar','template.tpl');
            // let prePath= path.join(__dirname,'src','components','chart','preview','preview.vue');
            // let tplFile = fs.readFileSync(tplPath);
            // let outFile = renderTemplate(tplFile.toString(),{ config: config })
            // fs.writeFileSync(prePath,outFile)
        });
        //用户拖动控件到面板中时触发
        socket.on('onDragInControl',function (config) {
            let configDiy = JSON.parse(config)
            let demoConfig = getChartDemoConfig(parseInt(configDiy.chartType))
            let copyObj = deepCopy(demoConfig)
            copyObj.dx=configDiy.dx
            copyObj.dy=configDiy.dy
            //增加图表id
            let chartId = `chart${Date.parse(new Date())}`
            globalStore.push({
                chartId:chartId,
                config:copyObj,
                chartType:parseInt(configDiy.chartType)
            })
            replaceFileByCompile(globalStore)
        });
        //用户在面板中拖动控件时触发
        socket.on('onDragInPanel',function (position) {
            //根据图表id修改globalStore的配置
            let configPosition = JSON.parse(position)
            let selectedChartIndex = findStoreIndexById(configPosition.chartId)
            if(selectedChartIndex>-1){
                globalStore[selectedChartIndex].config.dx = configPosition.dx
                globalStore[selectedChartIndex].config.dy = configPosition.dy
                if(configPosition.width || configPosition.height){
                    globalStore[selectedChartIndex].config.width = configPosition.width
                    globalStore[selectedChartIndex].config.height = configPosition.height
                }
                replaceFileByCompile(globalStore)
            }
        });
        //用户在面板中删除控件时触发
        socket.on('onDragRemove',function (chartId) {
            let selectedChartIndex = findStoreIndexById(chartId)
            if(selectedChartIndex>-1){
                globalStore.splice(selectedChartIndex,1)
                replaceFileByCompile(globalStore)
            }
        })
        //用户定义图表的基础信息
        socket.on('onSingleChartSimpleConfig',function (position) {
            let configPosition = JSON.parse(position)
            let selectedChartIndex = findStoreIndexById(configPosition.chartId)
            console.log(refreshSimpleChart)
            refreshSimpleChart(selectedChartIndex,configPosition).then((_config)=>{
                console.log(_config)
                replaceChartByCompile(_config)
            }).catch(()=>{

            })
        })
        /**
         * 图表基础信息刷新
         */
        let refreshSimpleChart = (selectedChartIndex,configPosition)=> {
            return new Promise((resolve, reject) => {
                if(selectedChartIndex>-1) {
                    let _config = globalStore[selectedChartIndex].config
                    _config.dx = configPosition.dx
                    _config.dy = configPosition.dy
                    if (configPosition.width || configPosition.height) {
                        _config.width = configPosition.width
                        _config.height = configPosition.height
                    }
                    resolve(globalStore[selectedChartIndex])
                }else{
                    reject()
                }
            })
        }
    })

    http.listen(9999, function(){
        console.log('listening on *:9999');
    });
}

module.exports = createConnection