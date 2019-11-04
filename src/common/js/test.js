let {chartMapDemoConfig} = require('./chartconfig')
let chartFactory = require('./chartfactory')
let chartMap = require('./chartdictionary')
let jsonMap = require('common/data/420000.json')
let handle = chartFactory.default.createOperate(chartMap.default.get(9))
let config = handle.setChartConfig(jsonMap,chartMapDemoConfig.commonConfig,chartMapDemoConfig.userConfig)
console.log(JSON.stringify(config))
export default config