import Component from './src/table'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component