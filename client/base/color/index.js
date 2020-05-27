import Component from './src/color'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component