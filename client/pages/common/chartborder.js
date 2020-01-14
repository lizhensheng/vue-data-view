function chartBorder() {
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

    }
    this.setLegend = function () {

    }
    this.getCommonConfig = function () {
        return {}
    }
    this.setChartConfig = function (data,commonConfig,userConfig) {
        this.data = data
        this.userConfig = userConfig
        let ret = Object.assign({},commonConfig,{

        })
        return ret
    }
}

export default chartBorder