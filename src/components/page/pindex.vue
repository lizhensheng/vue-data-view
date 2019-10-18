<template>
    <div class="pindex">
        
        <vue-draggable-resizable :x="15" :y="18" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375623000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375623000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="424" :y="14" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375629000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375629000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="840" :y="18" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375635000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375635000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="22" :y="446" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375641000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375641000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="435" :y="448" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375647000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375647000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="847" :y="451" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375652000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375652000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="1255" :y="17" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375656000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375656000" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
        
        <vue-draggable-resizable :x="1347" :y="503" :w="400" :h="400" @dragging="(left, top) =>onDrag('chart1571375680000',left,top)" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart1571375680000" style="width: 400px;height:400px;"></div>
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
            
            let configchart1571375623000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":15,"dy":18}
            let commonConfigchart1571375623000 = configchart1571375623000.commonConfig
            let userConfigchart1571375623000 = configchart1571375623000.userConfig
            let dataUrlchart1571375623000 = configchart1571375623000.dataUrl
            getChartData(dataUrlchart1571375623000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375623000,userConfigchart1571375623000)
                       echarts.init(this.$refs.chart1571375623000, {
                            width: configchart1571375623000.width-80,
                            height: configchart1571375623000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375629000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":424,"dy":14}
            let commonConfigchart1571375629000 = configchart1571375629000.commonConfig
            let userConfigchart1571375629000 = configchart1571375629000.userConfig
            let dataUrlchart1571375629000 = configchart1571375629000.dataUrl
            getChartData(dataUrlchart1571375629000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375629000,userConfigchart1571375629000)
                       echarts.init(this.$refs.chart1571375629000, {
                            width: configchart1571375629000.width-80,
                            height: configchart1571375629000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375635000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":840,"dy":18}
            let commonConfigchart1571375635000 = configchart1571375635000.commonConfig
            let userConfigchart1571375635000 = configchart1571375635000.userConfig
            let dataUrlchart1571375635000 = configchart1571375635000.dataUrl
            getChartData(dataUrlchart1571375635000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375635000,userConfigchart1571375635000)
                       echarts.init(this.$refs.chart1571375635000, {
                            width: configchart1571375635000.width-80,
                            height: configchart1571375635000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375641000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":22,"dy":446}
            let commonConfigchart1571375641000 = configchart1571375641000.commonConfig
            let userConfigchart1571375641000 = configchart1571375641000.userConfig
            let dataUrlchart1571375641000 = configchart1571375641000.dataUrl
            getChartData(dataUrlchart1571375641000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375641000,userConfigchart1571375641000)
                       echarts.init(this.$refs.chart1571375641000, {
                            width: configchart1571375641000.width-80,
                            height: configchart1571375641000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375647000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":435,"dy":448}
            let commonConfigchart1571375647000 = configchart1571375647000.commonConfig
            let userConfigchart1571375647000 = configchart1571375647000.userConfig
            let dataUrlchart1571375647000 = configchart1571375647000.dataUrl
            getChartData(dataUrlchart1571375647000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375647000,userConfigchart1571375647000)
                       echarts.init(this.$refs.chart1571375647000, {
                            width: configchart1571375647000.width-80,
                            height: configchart1571375647000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375652000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":847,"dy":451}
            let commonConfigchart1571375652000 = configchart1571375652000.commonConfig
            let userConfigchart1571375652000 = configchart1571375652000.userConfig
            let dataUrlchart1571375652000 = configchart1571375652000.dataUrl
            getChartData(dataUrlchart1571375652000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375652000,userConfigchart1571375652000)
                       echarts.init(this.$refs.chart1571375652000, {
                            width: configchart1571375652000.width-80,
                            height: configchart1571375652000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375656000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":1255,"dy":17}
            let commonConfigchart1571375656000 = configchart1571375656000.commonConfig
            let userConfigchart1571375656000 = configchart1571375656000.userConfig
            let dataUrlchart1571375656000 = configchart1571375656000.dataUrl
            getChartData(dataUrlchart1571375656000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375656000,userConfigchart1571375656000)
                       echarts.init(this.$refs.chart1571375656000, {
                            width: configchart1571375656000.width-80,
                            height: configchart1571375656000.height-80
                        }).setOption(tempConfig);
            })
            
            let configchart1571375680000 = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 模板","textStyle":{"color":"#D6BC28","fontSize":14}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"面积","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400,"dx":1347,"dy":503}
            let commonConfigchart1571375680000 = configchart1571375680000.commonConfig
            let userConfigchart1571375680000 = configchart1571375680000.userConfig
            let dataUrlchart1571375680000 = configchart1571375680000.dataUrl
            getChartData(dataUrlchart1571375680000).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfigchart1571375680000,userConfigchart1571375680000)
                       echarts.init(this.$refs.chart1571375680000, {
                            width: configchart1571375680000.width-80,
                            height: configchart1571375680000.height-80
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
                console.log('')
            }
        }
    }
</script>