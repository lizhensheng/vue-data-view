import instance from "../axios"
/**
 * 获取图表数据
 */
export function getChartData(url) {
    return instance.get(url)
}