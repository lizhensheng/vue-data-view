<template>
    <div class="preview">
        <div class="chart" ref="chart" style="width: 800px;height:800px;"></div>
    </div>
</template>

<script>
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "../bar/normalize"

    export default {
        mounted() {
            let config = <%- config%>
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