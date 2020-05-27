import Component from './src/border'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component