import {constructTree} from './imputil'
function chartTree() {
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
        //树形数据生成
        let d = constructTree(this.data)
        this.series =  [
            {
                type: 'tree',

                data: d,

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                symbolSize: 7,

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    this.setLegend = function () {

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

export default chartTree