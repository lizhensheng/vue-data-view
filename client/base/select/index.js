import Component from './src/select'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component