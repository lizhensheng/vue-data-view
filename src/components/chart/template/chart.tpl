<template>
    <div class="chart">
        <vue-draggable-resizable :x="<%- config.config.dx%>" :y="<%- config.config.dy%>" :w="<%- config.config.width%>" :h="<%- config.config.height%>" @dragging="(left, top) =>onDrag('<%- config.chartId%>',left,top)" @resizing="(x, y, width, height) =>onResize('<%- config.chartId%>',x, y, width, height)"  @activated="onActivated('<%- config.chartId%>')">
            <div @click="deleteChart('<%- config.chartId%>')" class="delete">删除</div>
            <div class="chart" ref="<%- config.chartId%>" style="width: <%- config.config.width%>px;height:<%- config.config.height%>px;"></div>
        </vue-draggable-resizable>
    </div>
</template>
<script>
    import './chart.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    import {socket} from "common/js/socket-client"
    import jsonobj from "common/js/chalk.project.json"
    export default {
        mounted() {
            let mconfig = <%- JSON.stringify(config)%>
            let commonConfig = mconfig.config.commonConfig
            let userConfig = mconfig.config.userConfig
            let dataUrl = mconfig.config.dataUrl
            getChartData(dataUrl).then((res)=>{
               let tempConfig = getCommonConfig(res.data.array,commonConfig,userConfig,<%- config.chartType%>)
               echarts.registerTheme('chalk',jsonobj)
                this.$echarts = echarts.init(this.$refs.<%- config.chartId%>, 'chalk', {
                    width: mconfig.config.width,
                    height: mconfig.config.height
                })
                this.$echarts.setOption(tempConfig)
            })
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
            onResize(id,x,y,width,height){
               let position = {
                   dx:x,
                   dy:y,
                   width:width,
                   height:height,
                   chartId:id
               }
               this.$echarts.resize({width:width,height:height})
               socket.emit('onDragInPanel',JSON.stringify(position))
            },
            deleteChart(id){
                socket.emit('onDragRemove',id)
            },
            onActivated(id){
                console.log(id)
                this.$emit('activeChart',id)
            }
        }
    }
</script>