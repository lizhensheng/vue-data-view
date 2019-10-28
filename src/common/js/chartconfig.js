/**
 * 图表中柱状图的默认配置
 */
const chartBarDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":"http://localhost:8888/api/bar/ydys/v1","width":300,"height":300}
const chartLineDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":"http://localhost:8888/api/line/ydys/v1","width":300,"height":300}
const chartPieDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":"http://localhost:8888/api/pie/ydys/v1","width":300,"height":300}
const chartRingDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":"http://localhost:8888/api/ring/ydys/v1","width":300,"height":300}
const chartCommonConfig = {"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}}
module.exports = {
    chartBarDemoConfig,
    chartLineDemoConfig,
    chartPieDemoConfig,
    chartRingDemoConfig,
    chartCommonConfig
}