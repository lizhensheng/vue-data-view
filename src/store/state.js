//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
    token: window.sessionStorage.getItem('token'),
    username: '',
    chartId:'',
    chartWidth:0,
    chartHeight:0,
    chartX:0,
    chartY:0,
    storePosition: {},
    increaseId:0
};
export default state
