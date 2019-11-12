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
    [types.DIALOG_ADD_PROJECT_VISIBLE]: (state, data) => {
        state.dialogAddProjectVisible = data;
    },
    [types.SET_TREE_DATA]: (state, data) => {
        state.treeData = data;
    },
    [types.DIALOG_ADD_PAGE_VISIBLE]: (state, data) => {
        state.dialogAddPageVisible = data
    },
    [types.SET_PROJECT_NAME_LIST]: (state, data) => {
        state.projectNameList = data
    }
};
export default mutations