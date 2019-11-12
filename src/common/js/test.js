let {chartMapDemoConfig} = require('./chartconfig')
let chartFactory = require('./chartfactory')
let chartMap = require('./chartdictionary')
let handle = chartFactory.default.createOperate(chartMap.default.get(13))
let config = handle.setChartConfig([],chartMapDemoConfig.commonConfig,chartMapDemoConfig.userConfig)
export default config