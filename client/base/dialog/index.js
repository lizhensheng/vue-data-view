import Component from './src/dialog'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component