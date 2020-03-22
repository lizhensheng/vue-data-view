import editorProjectConfig from '../../pages/power-editor/data-model/data-model'
import { createUUID } from '@/common/js/mUtils'
import {cloneDeep} from 'lodash'
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
    },
    removeElement({commit}, data){
        commit('removeElement', data)
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
        let copy = cloneDeep(data)
        let left =copy.props[0].fields[1].value[0].value.value
        let top =copy.props[0].fields[1].value[1].value.value
        let zindex =copy.props[0].fields[1].value[2].value.value
        copy.uuid = createUUID()
        copy.props[0].fields[1].value[0].value.value = left + 10
        copy.props[0].fields[1].value[1].value.value = top + 10
        copy.props[0].fields[1].value[2].value.value = zindex + 1
        state.projectDataInfo.pages[0].elements.push(copy)
    },
    removeElement(state, data){
        let activeElementIndex =state.projectDataInfo.pages[0].elements.findIndex(v => {return v.uuid === data})
        if(activeElementIndex >= 0){
            state.projectDataInfo.pages[0].elements.splice(activeElementIndex, 1)
            state.activeElementUUID = ''
        }
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