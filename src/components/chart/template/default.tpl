<template>
    <div class="pindex">
        <% for(let i =0;i<configs.length;i++){ %>
        <vue-draggable-resizable :x="<%- configs[i].config.dx%>" :y="<%- configs[i].config.dy%>" :w="<%- configs[i].config.width%>" :h="<%- configs[i].config.height%>" @dragging="(left, top) =>onDrag('<%- configs[i].chartId%>',left,top)" @resizing="onResize" >
            <div class="chart" ref="<%- configs[i].chartId%>" style="width: <%- configs[i].config.width%>px;height:<%- configs[i].config.height%>px;"></div>
        </vue-draggable-resizable>
        <% } %>
    </div>
</template>
<script>
    import './pindex.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    import {socket} from "common/js/socket-client"
    import jsonobj from "common/js/chalk.project.json"
    export default {
        mounted() {
            <% for(let i =0;i<configs.length;i++){ %>
            let config<%- configs[i].chartId%> = <%- JSON.stringify(configs[i].config)%>
            let commonConfig<%- configs[i].chartId%> = config<%- configs[i].chartId%>.commonConfig
            let userConfig<%- configs[i].chartId%> = config<%- configs[i].chartId%>.userConfig
            let dataUrl<%- configs[i].chartId%> = config<%- configs[i].chartId%>.dataUrl
            getChartData(dataUrl<%- configs[i].chartId%>).then((res)=>{
               let tempConfig = getCommonConfig(res.data.array,commonConfig<%- configs[i].chartId%>,userConfig<%- configs[i].chartId%>,<%- configs[i].chartType%>)
               echarts.registerTheme('chalk',jsonobj)
               echarts.init(this.$refs.<%- configs[i].chartId%>, 'chalk', {
                    width: config<%- configs[i].chartId%>.width,
                    height: config<%- configs[i].chartId%>.height
                }).setOption(tempConfig);
            })
            <% } %>
        },
        methods:{
            onDrag(id,x,y){
                let position = {
                   dx:x,
                   dy:y,
                   chartId:id
                }
                socket.emit('onDragInPanel',JSON.stringify(position))
            },
            onResize(){
                // eslint-disable-next-line no-console
                console.log('')
            }
        }
    }
</script>