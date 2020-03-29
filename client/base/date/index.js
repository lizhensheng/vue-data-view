import Component from './src/date'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component