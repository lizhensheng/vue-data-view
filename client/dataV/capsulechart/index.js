import Component from './src/capsulechart'
Component.install = Vue => {
    Vue.Component(Component.name,Component)
}
export default Component