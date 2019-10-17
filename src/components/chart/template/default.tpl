<template>
    <div class="pindex">
        <% for(let i =0;i<configs.length;i++){ %>
        <vue-draggable-resizable :x="<%- configs[i].config.dx%>" :y="<%- configs[i].config.dy%>" :w="<%- configs[i].config.width%>" :h="<%- configs[i].config.height%>" @dragging="onDrag" @resizing="onResize"  :parent="true">
            <div class="<%- configs[i].chartId%>" ref="chart" style="width: <%- configs[i].config.width%>px;height:<%- configs[i].config.height%>px;"></div>
        </vue-draggable-resizable>
        <% } %>
    </div>
</template>
<script>
    import './pindex.styl'
    let echarts = require('echarts')
    import {getChartData} from "api/bar"
    import {getCommonConfig} from "common/js/normalize"
    export default {
        mounted() {
            <% for(let i =0;i<configs.length;i++){ %>
            let config = <%- configs[i].config%>
            let commonConfig = config.commonConfig
            let userConfig = config.userConfig
            let dataUrl = config.dataUrl
            getChartData(dataUrl).then((res)=>{
                let tempConfig = getCommonConfig(res.data.array,commonConfig,userConfig)
                       echarts.init(this.$refs.<%- configs[i].chartId%>, {
                            width: config.width-80,
                            height: config.height-80
                        }).setOption(tempConfig);
            })
            <% } %>
        },
        methods:{
            onDrag(){
                console.log('')
            },
            onResize(){
                console.log('')
            }
        }
    }
</script>