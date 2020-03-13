const state = {
    imgList: []
}

const actions = {
    setImgList({commit}, data){
        commit('setImgList', data)
    }
}

const mutations = {
    setImgList(state, data){
        state.imgList = data
    }
}

const getters = {
    imgList(state){
        return state.imgList
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}