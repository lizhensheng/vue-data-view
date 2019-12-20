/**
 * 获取x轴数据
 */
export function getXData(data,config) {
    let xData = []
    let {x} = config
    data.forEach((item)=>{
        let value = item[x]
        xData.push(value)
    })
    return xData
}

/**
 * 获取y轴的数据
 */
export function getSeries(data,config,chartType) {
    let seriesData = []
    let {y} = config
    y.forEach((item,index)=>{
        let name = item.name
        let id = item.id
        if(chartType == 1){
            seriesData.push({
                name:name,
                type:'line',
                data:[],
                stack:'总量'
            })

            data.forEach((item)=>{
                let value = item[id]
                seriesData[index].data.push(value)
            })
        }
        else if(chartType == 2){
            seriesData.push({
                name:name,
                type:'bar',
                data:[],
                barWidth:20
            })

            data.forEach((item)=>{
                let value = item[id]
                seriesData[index].data.push(value)
            })
        }else if(chartType == 3){
            if(seriesData.length == 0) {
                seriesData.push({
                    name: '默认',
                    type: 'pie',
                    data: [],
                    radius: '55%',
                    center: ['50%', '60%']
                })
            }

            let value = data[0][id]
            seriesData[0].data.push({value:value,name:name})
        }else if(chartType == 4){
            if(seriesData.length == 0) {
                seriesData.push({
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
                })
            }

            let value = data[0][id]
            seriesData[0].data.push({value:value,name:name})
        }
    })
    return seriesData
}

/**
 * 获取分类
 */
export function getLegend(config) {
    let legend = []
    let {y} = config
    y.forEach((item)=> {
        legend.push(item.name)
    })
    return legend
}

/**
 * 获取y轴的单位
 */
export function getyAxis(config) {
    let {yAxis} = config
    return yAxis
}

/**
 * 对不同类型的图表配置的拼接
 */
export function getCommonConfig(data,commonConfig,userConfig,chartType) {
    //当是饼图的时候不需要x轴配置了
    let x = chartType == 3 || chartType == 4 ? [] : getXData(data,userConfig)
    let series = getSeries(data,userConfig,chartType)
    let legend = getLegend(userConfig)
    let yAxis = getyAxis(userConfig)
    let ret = Object.assign({},commonConfig,{
        legend: {
            data:legend
        },
        xAxis: [
            {
                type: 'category',
                data: x
            }
        ],
        yAxis: {
            type: 'value'
        },
        series: series
    })
    return ret
}
