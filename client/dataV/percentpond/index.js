import Component from './src/percentpond'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component