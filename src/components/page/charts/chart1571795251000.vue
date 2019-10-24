<template>
    <div class="chart">
        <vue-draggable-resizable :x="526"
                                 :y="42"
                                 :w="400"
                                 :h="400"
                                 @dragging="(left, top) =>onDrag('chart1571795251000',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('chart1571795251000',x, y, width, height)"
                                 @activated="onActivated('chart1571795251000')"
                                 @deactivated="onDeactivated('chart1571795251000')">
            <div @click="deleteChart('chart1571795251000')" class="delete">删除</div>
            <div class="chart" ref="chart1571795251000" style="width: 400px;height:400px;"></div>
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
    import {mapMutations} from 'vuex'
    export default {
        mounted() {
            let mconfig = {"chartId":"chart1571795251000","config":{"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/pie/ydys/v1","width":400,"height":400,"dx":526,"dy":42},"chartType":3}
            let commonConfig = mconfig.config.commonConfig
            let userConfig = mconfig.config.userConfig
            let dataUrl = mconfig.config.dataUrl
            getChartData(dataUrl).then((res)=>{
               let tempConfig = getCommonConfig(res.data.array,commonConfig,userConfig,3)
               echarts.registerTheme('chalk',jsonobj)
                this.$echarts = echarts.init(this.$refs.chart1571795251000, 'chalk', {
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
                this.setChartId(id)
            },
            onDeactivated(){
                this.setChartId('')
            },
            ...mapMutations({
                setChartId:'SET_CHART_ID'
            })
        }
    }
</script>