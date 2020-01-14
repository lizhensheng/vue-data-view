function chartK() {
    this.xAxis = ''
    this.yAxis = ''
    this.series = ''
    this.legend = ''
    this.data = ''
    this.userConfig = ''
    this.setXAxis = function () {
        let x = this.userConfig.x
        if( x  instanceof Array) {
            x = x[0]
        }
        let xData = []
        this.data.forEach((item)=>{
            let value = item[x]
            xData.push(value)
        })
        this.xAxis = {
            data: xData,
            axisLabel: {
                rotate: 45
            }
        }
    }
    this.setYAxis = function () {
        this.yAxis = {

        }
    }
    this.setSeries = function () {
        let y = this.userConfig.y
        let seriesData=[{
            type: 'k',
            data: []
        }]
        this.data.forEach((item) => {
            let k = []
            y.forEach((it)=> {
                let value = item[it.id]
                k.push(value)
            })
            seriesData[0].data.push(k)
        })
        this.series = seriesData
    }
    this.setLegend = function () {
        this.legend = {

        }
    }
    this.setChartConfig = function (data,commonConfig,userConfig) {
        this.data = data
        this.userConfig = userConfig
        this.setXAxis()
        this.setYAxis()
        this.setSeries()
        this.setLegend()
        let ret = Object.assign({},commonConfig,{
            legend: this.legend,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            series: this.series
        })
        return ret
    }
}

export default chartK