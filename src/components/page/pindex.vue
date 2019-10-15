<template>
    <div class="pindex">
        <vue-draggable-resizable :w="400" :h="400" @dragging="onDrag" @resizing="onResize"  :parent="true">
            <div class="chart" ref="chart" style="width: 400px;height:400px;"></div>
        </vue-draggable-resizable>
    </div>
</template>
<script>
    import './pindex.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    export default {
        mounted() {
            let config = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"* 雕刻技法","textStyle":{"color":"#D6BC28","fontSize":21}}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"国务院批准总面积"},{"id":"SZFPZZMJ","name":"省政府批准总面积"}],"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value} "}}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":400,"height":400}
            let commonConfig = config.commonConfig
            let userConfig = config.userConfig
            let dataUrl = config.dataUrl
            getChartData(dataUrl).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfig,userConfig)
                echarts.init(this.$refs.chart,{width:config.width,height:config.height}).setOption(tempConfig);
            })

        }
    }
</script>