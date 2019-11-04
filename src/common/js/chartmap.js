function chartMap() {
    this.xAxis = ''
    this.yAxis = ''
    this.series = ''
    this.legend = ''
    this.data = ''
    this.userConfig = ''
    this.setXAxis = function () {

    }
    this.setYAxis = function () {

    }
    this.setSeries = function () {
        let seriesData=[{
            name:'湖北',
            map:'湖北',
            mapType:'湖北',
            type: 'map',
            label:{
                normal:{
                    show:true,
                    textStyle:{
                        color:'#fff'
                    }
                },
                emphasis:{
                    show:true,
                    textStyle: {
                        color:'#333'
                    }
                }
            },
            data: []
        }]
        this.data.features.forEach((item) => {
            seriesData[0].data.push({
                name:item.properties.name,
                value:item.properties.adcode,
            })
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
        this.setSeries()
        let ret = Object.assign({},commonConfig,{
            series: this.series
        })
        return ret
    }
}

export default chartMap