import {baseConfigApi} from './config'
import echarts from 'echarts'
/**
 * 图表中柱状图的默认配置
 */
export const chartBarDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":`${baseConfigApi}/api/bar/ydys/v1`,"width":300,"height":300}
export const chartLineDemoConfig = {"commonConfig":{"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow","label":{"show":true}}},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":`${baseConfigApi}/api/line/ydys/v1`,"width":300,"height":300}
export const chartPieDemoConfig = {"commonConfig":{"tooltip":{"trigger": 'item', "formatter": "{a} <br/>{b} : {c} ({d}%)"},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":`${baseConfigApi}/api/pie/ydys/v1`,"width":300,"height":300}
export const chartRingDemoConfig = {"commonConfig":{"tooltip":{"trigger": 'item', "formatter": "{a} <br/>{b} : {c} ({d}%)"},"title":{"text":"","textStyle":{"color":"#D6BC28","fontSize":14}},"textStyle":{"color":"#fff"}},"userConfig":{"x":"TJDATE","y":[{"id":"GWYPZZMJ","name":"test1"},{"id":"SZFPZZMJ","name":"test2"}]},"dataUrl":`${baseConfigApi}/api/ring/ydys/v1`,"width":300,"height":300}
export const chartScatterDemoConfig =  {"commonConfig":{},"userConfig":{"x":["year","region"],"y":[{"id":"POPULATION","name":"人口"},{"id":"ECONOMICS","name":"经济"}]},"dataUrl":`${baseConfigApi}/api/scatter/ydys/v1`,"width":300,"height":300}
