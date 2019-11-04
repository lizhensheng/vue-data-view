function chartRadar() {
    this.xAxis = ''
    this.yAxis = ''
    this.series = ''
    this.legend = ''
    this.data = ''
    this.userConfig = ''
    this.radar = ''
    this.setXAxis = function () {

    }
    this.setYAxis = function () {

    }
    this.setSeries = function () {
        let y = this.userConfig.y
        let seriesData = [{
            name: '数据',
            type: 'radar',
            areaStyle: {normal: {}},
            data: []
        }]
        this.legend.data.forEach((item,index)=> {
            let ms = []
            y.forEach((k)=>{
                let value=this.data[index][k.id]
                ms.push(value)
            })

            seriesData[0].data.push({value:ms,name:item})
        })
        this.series = seriesData
    }
    this.setLegend = function () {
        let legend = []
        let x= this.userConfig.x
        if(x instanceof Array){
            x = x[0]
        }
        this.data.forEach((item)=> {
            legend.push(item[x])
        })
        this.legend = {
            data:legend
        }
    }
    this.setRadar = function () {
        let rd = {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator:[]
        }
        let y = this.userConfig.y
        y.forEach((k)=>{
            let drr = []
            this.data.forEach(d=>{
                drr.push(d[k.id])
            })
            let mx = Math.max(...drr)
            let mn = Math.min(...drr)
            rd['indicator'].push({name: k.name,max: mx + (mx-mn)})
        })
        this.radar = rd
    }
    this.setChartConfig = function (data,commonConfig,userConfig) {
        this.data = data
        this.userConfig = userConfig
        this.setLegend()
        this.setSeries()
        this.setRadar()
        let ret = Object.assign({},commonConfig,{
            legend: this.legend,
            series: this.series,
            radar: this.radar
        })
        return ret
    }
}

export default chartRadar