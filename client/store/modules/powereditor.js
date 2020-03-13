import editorProjectConfig from '../../pages/power-editor/data-model/data-model'
//假设一个项目对应一个页面
const state = {
    projectDataInfo: editorProjectConfig.getProjectConfig(),
    activeElementUUID: ''
}

const actions = {
    setProjectDataInfo({commit}, data){
        commit('setProjectDataInfo', data)
    },
    setActiveElementUUID({commit}, data){
        commit('setActiveElementUUID', data)
    },
    addElement({commit}, data){
        commit('addElement', data)
    }
}

const mutations = {
    setProjectDataInfo(state, data){
        state.projectDataInfo = data
    },
    setActiveElementUUID(state, data){
        state.activeElementUUID = data
    },
    addElement(state, data){
        state.projectDataInfo.pages[0].elements.push(data)
    }
}

const getters = {
    projectDataInfo(state){
        return state.projectDataInfo
    },
    activeElementUUID(state){
        return state.activeElementUUID
    },
    activeElement(state){
        return state.projectDataInfo.pages[0].elements.find(element => {
            return element.uuid === state.activeElementUUID
        });
    },
    activePage(state){
        return state.projectDataInfo.pages[0]
    },
    activeElementIndex(state){
        return state.projectDataInfo.pages[0].elements.findIndex(v => {return v.uuid === state.activeElementUUID})
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}