let {getChartDemoConfig,replaceFileByCompile} = require('./src/common/js/charthelper')
/**
 * 保存了所有临时的图表的配置
 */
let globalStore = []
let createConnection = function createConnection(app) {
    let http = require('http').createServer(app)
    let io = require('socket.io')(http)
    io.on('connection', function(socket){
        console.log('连接上服务器了');
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
        socket.on('onDragInControl',function (config) {
            let configDiy = JSON.parse(config)
            let demoConfig = getChartDemoConfig(configDiy.chartType)
            demoConfig.dx=configDiy.dx
            demoConfig.dy=configDiy.dy
            //增加图表id
            let chartId = `chart${Date.parse(new Date())}`
            globalStore.push({
                chartId:chartId,
                config:demoConfig
            })
            replaceFileByCompile(globalStore)
        });
    })

    http.listen(9999, function(){
        console.log('listening on *:9999');
    });
}

module.exports = createConnection