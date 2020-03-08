const state = {
    scalePercent: 50,
    screenShot: {   //画布的宽高
        width: 0,
        height: 0
    },
    singleScaleWidth: 0,
    relationScale: 0,
    showThumbnail: true,
    canvaswp: {
        scrollTop: 0,
        scrollLeft: 0,
        clientWidth: 0,
        clientHeight: 0
    }
}

const actions = {
    setScalePercent({commit}, data){
        commit('setScalePercent', data)
    },
    setScreenShot({commit}, data){
        commit('setScreenShot', data)
    },
    setSingleScaleWidth({commit}, data){
        commit('setSingleScaleWidth',data)
    },
    setRelationScale({commit}, data){
        commit('setRelationScale', data)
    },
    setShowThumbnail({commit}, data){
        commit('setShowThumbnail', data)
    },
    setCanvaswp({commit}, data){
        commit('setCanvaswp', data)
    }
}

const mutations = {
    setScalePercent(state, data){
        state.scalePercent = data
    },
    setScreenShot(state, data){
        state.screenShot = data
    },
    setSingleScaleWidth(state, data){
        state.singleScaleWidth = data
    },
    setRelationScale(state, data){
        state.relationScale = data
    },
    setShowThumbnail(state, data){
        let show = data.show
        state.showThumbnail = show
    },
    setCanvaswp(state, data){
        state.canvaswp = data
    }
} 


const getters = {
    scalePercent(state){
        return state.scalePercent
    },
    screenShot(state){
        return state.screenShot
    },
    singleScaleWidth(state){
        return state.singleScaleWidth
    },
    relationScale(state){
        return state.relationScale
    },
    showThumbnail(state){
        return state.showThumbnail
    },
    canvaswp(state){
        return state.canvaswp
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}

