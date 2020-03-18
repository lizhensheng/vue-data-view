import Component from './src/checkbox'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component