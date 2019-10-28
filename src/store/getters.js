export const chartId = state => state.chartId
export const chartWidth = state => state.chartWidth
export const chartHeight = state => state.chartHeight
export const chartX = state => state.chartX
export const chartY = state => state.chartY
export const storePosition = (state) => (chartId) => state.storePosition[chartId]
export const chartConfigs = (state) => state.storePosition
export const increaseIdForData = state => state.increaseIdForData
export const increaseId = state => state.increaseId