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

export function getSeries(data,config) {
    let seriesData = []
    let {y} = config
    y.forEach((item,index)=>{
        let name = item.name
        let id = item.id
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
    })
    return seriesData
}

export function getLegend(config) {
    let legend = []
    let {y} = config
    y.forEach((item)=> {
        legend.push(item.name)
    })
    return legend
}

export function getyAxis(config) {
    let {yAxis} = config
    return yAxis
}

export function getCommonConfig(data,commonConfig,userConfig) {
    let x = getXData(data,userConfig)
    let series = getSeries(data,userConfig)
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
        yAxis: yAxis,
        series: series
    })
    return ret
}
