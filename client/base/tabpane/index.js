import Component from '../tabs/src/tab-pane'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component