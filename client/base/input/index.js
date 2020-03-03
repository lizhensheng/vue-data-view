import Component from './src/input'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component