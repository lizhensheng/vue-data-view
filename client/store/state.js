//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
    token: window.sessionStorage.getItem('token'),
    username: '',
    dialogAddProjectVisible: false,
    treeData:[],
    dialogAddPageVisible:false,
    projectNameList:[]
};
export default state
