import Component from '../tabs/src/tab-panel'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component