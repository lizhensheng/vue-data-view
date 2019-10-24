import * as types from './mutation-types'
const mutations = {
    LOGIN: (state, data) => {
        //更改token的值
        state.token = data;
        window.sessionStorage.setItem('token', data);
    },
    LOGOUT: (state) => {
        //登出的时候要清除token
        state.token = null;
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('username');
    },
    USERNAME: (state, data) => {
        //把用户名存起来
        state.username = data;
        window.sessionStorage.setItem('username', data);
    },
    [types.SET_CHART_ID](state,chartId){
        state.chartId = chartId
    },
    [types.SET_CHART_WIDTH](state,chartWidth){
        state.chartWidth = chartWidth
    },
    [types.SET_CHART_HEIGHT](state,chartHeight){
        state.chartHeight = chartHeight
    },
    [types.SET_CHART_X](state,chartX){
        state.chartX = chartX
    },
    [types.SET_CHART_Y](state,chartY){
        state.chartY = chartY
    },
    [types.SET_POSITION](state,position){
        state.storePosition[position.id] = position
    },
    [types.SET_INCREASE_ID](state,increaseId){
        state.increaseId = increaseId
    }
};
export default mutations