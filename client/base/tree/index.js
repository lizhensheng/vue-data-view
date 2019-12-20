import Component from './src/tree'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component