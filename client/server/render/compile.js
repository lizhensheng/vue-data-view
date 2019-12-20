const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
let echarts = require('echarts')
server.get('*', (req, res) => {
    const app = new Vue({
        template: '<div class="chart" ref="chart1" style="width: 400px;height:400px;"></div>',
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(this.$refs.chart1,'chalk');
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    })
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

server.listen(7777)