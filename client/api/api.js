import instance from "../axios"
export function getTableDataDynamic(url) {
    return instance.get(url)
}
/**
 * 获取图表数据
 */
export function getChartData(url) {
    return instance.get(url)
}