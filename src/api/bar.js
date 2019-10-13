const axios = require('axios');
/**
 * 获取图表数据
 */
export function getChartData(url) {
    return axios.get(url)
}