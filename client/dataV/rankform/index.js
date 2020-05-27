import Component from './src/index'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component
