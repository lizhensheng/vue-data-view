import Component from './src/collapse'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component