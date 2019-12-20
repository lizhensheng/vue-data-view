import echarts from 'echarts'
function chartScatter() {
    this.xAxis = ''
    this.yAxis = ''
    this.series = ''
    this.legend = ''
    this.data = ''
    this.userConfig = ''
    this.setXAxis = function () {
        this.xAxis = {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        }
    }
    this.setYAxis = function () {
        this.yAxis =  {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        }
    }
    this.setSeries = function () {
        let {x} = this.userConfig
        if(x.length<2){
            console.log('配置错误')
            return
        }
        let group = x[0]
        let label = x[1]
        let datas = []
        let indexName = -1
        //一维数组变二维数组
        this.legend.data.forEach(item=>{
            let arr = []
            this.data.forEach(k=>{
                if(k[group] == item){
                    let name = k[label]
                    let values = Object.values(k)
                    let arr1 = []
                    let arr2 = []
                    values.forEach(j=>{
                        if(typeof j == "number"){
                            arr1.push(j)
                        }else{
                            arr2.push(j)
                        }
                    })
                    let myArr = arr1.concat(arr2)
                    if(indexName == -1){
                        indexName = myArr.indexOf(name)
                    }
                    arr.push(myArr)
                }
            })
            let red = (Math.random()*255)
            let blue = (Math.random()*255)
            let yellow = (Math.random()*255)
            datas.push({
                name: item,
                data: arr,
                type: 'scatter',
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[indexName];
                            },
                            position: 'top'
                        }
                    },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: `rgb(${red}, ${blue}, ${yellow})`
                        }, {
                            offset: 1,
                            color: `rgb(${red}, ${blue}, ${yellow})`
                        }])
                    }
                }
            })
        })
        this.series = datas
    }
    this.setLegend = function () {
        let {x} = this.userConfig
        if(x.length<2){
            console.log('配置错误')
            return
        }
        let group = x[0]
        let groupNames = []
        //先根据group分组
        this.data.forEach(item=>{
            if(!groupNames.includes(item[group])){
               groupNames.push(item[group])
            }
        })
        this.legend = {
            "right": 10,
            "data":groupNames
        }
    }
    this.setChartConfig = function (data,commonConfig,userConfig) {
        this.data = data
        this.userConfig = userConfig
        this.setLegend()
        this.setXAxis()
        this.setYAxis()
        this.setSeries()
        let ret = Object.assign({},commonConfig,{
            legend: this.legend,
            series: this.series,
            xAxis:this.xAxis,
            yAxis:this.yAxis
        })
        return ret
    }
}

export default chartScatter