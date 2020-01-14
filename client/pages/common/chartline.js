function chartLine() {
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
        this.xAxis = [
            {
                type: 'category',
                data: xData
            }
        ]
    }
    this.setYAxis = function () {
        this.yAxis = {
            type: 'value'
        }
    }
    this.setSeries = function () {
        let y = this.userConfig.y
        let seriesData = []
        y.forEach((item,index)=> {
            let name = item.name
            let id = item.id
            seriesData.push({
                name: name,
                type: 'line',
                data: [],
                stack: '总量'
            })
            this.data.forEach((item) => {
                let value = item[id]
                seriesData[index].data.push(value)
            })
        })
        this.series = seriesData
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

export default chartLine