<template>
    <div class="chart">
        <vue-draggable-resizable :x="25"
                                 :y="11"
                                 :w="590"
                                 :h="249"
                                 @dragging="(left, top) =>onDrag('chart1571883383000',left,top)"
                                 @resizing="(x, y, width, height) =>onResize('chart1571883383000',x, y, width, height)"
                                 @activated="onActivated('chart1571883383000')">
            <div @click="deleteChart('chart1571883383000')" class="delete">删除</div>
            <div class="chart" ref="chart1571883383000"
                               style="width: 590px;height:249px;"
                               data-width="590" data-height="249" data-x="25" data-y="11"></div>
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
            let mconfig = {"chartId":"chart1571883383000","config":{"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/line/ydys/v1","width":590,"height":249,"dx":25,"dy":11},"chartType":1}
            let commonConfig = mconfig.config.commonConfig
            let userConfig = mconfig.config.userConfig
            let dataUrl = mconfig.config.dataUrl
            getChartData(dataUrl).then((res)=>{
               let tempConfig = getCommonConfig(res.data.array,commonConfig,userConfig,1)
               echarts.registerTheme('chalk',jsonobj)
                this.$echarts = echarts.init(this.$refs.chart1571883383000, 'chalk', {
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
               socket.emit('onDragInPanel',JSON.stringify(position))
            },
            deleteChart(id){
                socket.emit('onDragRemove',id)
            },
            onActivated(id){
                let _set = this.$refs[id].dataset
                this.setChartId(id)
                this.setChartWidth(_set.width)
                this.setChartHeight(_set.height)
                this.setChartX(_set.x)
                this.setChartY(_set.y)
            },
            ...mapMutations({
                setChartId:'SET_CHART_ID',
                setChartWidth:'SET_CHART_WIDTH',
                setChartHeight:'SET_CHART_HEIGHT',
                setChartX:'SET_CHART_X',
                setChartY:'SET_CHART_Y'
            })
        }
    }
</script>