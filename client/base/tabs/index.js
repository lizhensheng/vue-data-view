import Component from './src/tabs'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component