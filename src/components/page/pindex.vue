<template>
    <div class="pindex">
        
        <vue-draggable-resizable :x="31" :y="26" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571391917000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571391917000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="434" :y="28" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571391924000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571391924000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="863" :y="28" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571391927000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571391927000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="1288" :y="51" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571391942000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571391942000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="219" :y="588" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571391948000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571391948000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
    </div>
</template>
<script>
    import './pindex.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    import {socket} from "common/js/socket-client"
    export default {
        mounted() {
            
            let configchart1571391917000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/line/ydys/v1","width":400,"height":400,"dx":31,"dy":26}
            let commonConfigchart1571391917000 = configchart1571391917000.commonConfig
            let userConfigchart1571391917000 = configchart1571391917000.userConfig
            let dataUrlchart1571391917000 = configchart1571391917000.dataUrl
            getChartData(dataUrlchart1571391917000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571391917000,userConfigchart1571391917000,1)
                       echarts.init(this.$refs.chart1571391917000, {
                            width: configchart1571391917000.width-80,
                            height: configchart1571391917000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571391924000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/pie/ydys/v1","width":400,"height":400,"dx":434,"dy":28}
            let commonConfigchart1571391924000 = configchart1571391924000.commonConfig
            let userConfigchart1571391924000 = configchart1571391924000.userConfig
            let dataUrlchart1571391924000 = configchart1571391924000.dataUrl
            getChartData(dataUrlchart1571391924000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571391924000,userConfigchart1571391924000,3)
                       echarts.init(this.$refs.chart1571391924000, {
                            width: configchart1571391924000.width-80,
                            height: configchart1571391924000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571391927000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/ring/ydys/v1","width":400,"height":400,"dx":863,"dy":28}
            let commonConfigchart1571391927000 = configchart1571391927000.commonConfig
            let userConfigchart1571391927000 = configchart1571391927000.userConfig
            let dataUrlchart1571391927000 = configchart1571391927000.dataUrl
            getChartData(dataUrlchart1571391927000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571391927000,userConfigchart1571391927000,4)
                       echarts.init(this.$refs.chart1571391927000, {
                            width: configchart1571391927000.width-80,
                            height: configchart1571391927000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571391942000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/line/ydys/v1","width":400,"height":400,"dx":1288,"dy":51}
            let commonConfigchart1571391942000 = configchart1571391942000.commonConfig
            let userConfigchart1571391942000 = configchart1571391942000.userConfig
            let dataUrlchart1571391942000 = configchart1571391942000.dataUrl
            getChartData(dataUrlchart1571391942000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571391942000,userConfigchart1571391942000,1)
                       echarts.init(this.$refs.chart1571391942000, {
                            width: configchart1571391942000.width-80,
                            height: configchart1571391942000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571391948000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":219,"dy":588}
            let commonConfigchart1571391948000 = configchart1571391948000.commonConfig
            let userConfigchart1571391948000 = configchart1571391948000.userConfig
            let dataUrlchart1571391948000 = configchart1571391948000.dataUrl
            getChartData(dataUrlchart1571391948000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571391948000,userConfigchart1571391948000,2)
                       echarts.init(this.$refs.chart1571391948000, {
                            width: configchart1571391948000.width-80,
                            height: configchart1571391948000.height-80
                        }).setOption(tempConfig);
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
            onResize(){
                // eslint-disable-next-line no-console
                console.log('')
            }
        }
    }
</script>