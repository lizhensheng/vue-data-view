let {chartScatterDemoConfig} = require('./chartconfig')
let chartFactory = require('./chartfactory')
let chartMap = require('./chartdictionary')
let handle = chartFactory.default.createOperate(chartMap.default.get(5))
let config = handle.setChartConfig([
    {
        year: '2006',
        region: "武汉",
        POPULATION: 68,
        ECONOMICS: 5888
    },
    {
        year: '2007',
        region: "武汉",
        POPULATION: 89,
        ECONOMICS: 15896
    },
    {
        year: '2006',
        region: "襄阳",
        POPULATION: 45,
        ECONOMICS: 3896
    },
    {
        year: '2007',
        region: "襄阳",
        POPULATION: 65,
        ECONOMICS: 7896
    }
],chartScatterDemoConfig.commonConfig,chartScatterDemoConfig.userConfig)
console.log(JSON.stringify(config))
export default config