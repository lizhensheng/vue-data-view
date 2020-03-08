import Component from '../collapse/src/collapse-item'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component