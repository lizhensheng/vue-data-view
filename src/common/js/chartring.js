function chartPie() {
    this.xAxis = ''
    this.yAxis = ''
    this.series = ''
    this.legend = ''
    this.data = ''
    this.userConfig = ''
    this.setXAxis = function () {
        //饼图没有x轴
    }
    this.setYAxis = function () {
        //饼图没有y轴
    }
    this.setSeries = function () {
        let y = this.userConfig.y
        let seriesData = {
            name: '默认',
            type: 'pie',
            data: [],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            }
        }
        y.forEach((item)=> {
            let name = item.name
            let id = item.id
            let value = this.data[0][id]
            seriesData.data.push({value:value,name:name})
        })
        this.series = [seriesData]
    }
    this.setLegend = function () {
        let legend = []
        let y= this.userConfig.y
        y.forEach((item)=> {
            legend.push(item.name)
        })
        this.legend = {
            data:legend
        }
    }
    this.setChartConfig = function (data,commonConfig,userConfig) {
        this.data = data
        this.userConfig = userConfig
        this.setSeries()
        this.setLegend()
        let ret = Object.assign({},commonConfig,{
            legend: this.legend,
            series: this.series
        })
        return ret
    }
}

export default chartPie