<template>
        <div class="chart" ref="chart1" style="width: 400px;height:400px;"></div>
</template>

<script>
    let echarts = require('echarts')
    import jsonobj from "common/js/chalk.project.json"
    import config from 'common/js/test'
    export default {
        mounted() {
            echarts.registerTheme('chalk',jsonobj)
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(this.$refs.chart1,'chalk');
            // 绘制图表
            // myChart.setOption({
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     xAxis: {
            //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
            myChart.setOption(config)
        }
    }
</script>